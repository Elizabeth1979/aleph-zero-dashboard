import unittest

from scripts.calm_compass.engine import CANONICAL_RING_LABELS, CANONICAL_RING_ORDER, update_preferences


class PreferenceTests(unittest.TestCase):
    def test_explicit_correction_overrides_learned_weight(self):
        current = {"weights": {"quick": 1.0}, "explicit_corrections": {}}
        result = update_preferences(
            current,
            learned_updates={"quick": 0.1},
            explicit_corrections={"quick": 0.7},
        )
        self.assertEqual(result["weights"]["quick"], 0.7)
        self.assertEqual(result["explicit_corrections"]["quick"], 0.7)

    def test_learned_weight_change_is_bounded_per_update(self):
        current = {"weights": {"deep": 1.0}, "explicit_corrections": {}}
        increased = update_preferences(current, {"deep": 5.0})
        decreased = update_preferences(current, {"deep": -5.0})
        self.assertEqual(increased["weights"]["deep"], 1.1)
        self.assertEqual(decreased["weights"]["deep"], 0.9)

    def test_ring_labels_and_order_cannot_be_personalized(self):
        current = {
            "weights": {},
            "explicit_corrections": {},
            "ring_order": ["setup", "today"],
            "ring_labels": {"today": "Panic"},
        }
        result = update_preferences(
            current,
            learned_updates={"ring_order": 99, "ring_labels": 99},
            explicit_corrections={"ring_order": 0, "ring_labels": 0},
        )
        self.assertEqual(result["ring_order"], CANONICAL_RING_ORDER)
        self.assertEqual(result["ring_labels"], CANONICAL_RING_LABELS)

    def test_preference_update_does_not_mutate_input(self):
        current = {"weights": {"quick": 1.0}, "explicit_corrections": {}}
        update_preferences(current, {"quick": 0.1})
        self.assertEqual(current, {"weights": {"quick": 1.0}, "explicit_corrections": {}})


if __name__ == "__main__":
    unittest.main()
