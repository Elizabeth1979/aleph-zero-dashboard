import copy
import unittest

from scripts.calm_compass.engine import find_connections


class ConnectionTests(unittest.TestCase):
    def test_shared_project_resource_tags_create_connection_with_evidence(self):
        tasks = [{"id": "t1", "title": "Draft accessibility guide", "project_id": "a11y", "tags": ["WCAG"]}]
        resources = [{"id": "r1", "title": "WCAG patterns", "tags": ["wcag"]}]
        result = find_connections(tasks, resources, [])
        self.assertEqual(result[0]["id"], "resource-task:r1:t1")
        self.assertEqual(result[0]["sourceIds"], ["r1", "t1"])
        self.assertEqual(result[0]["evidence"], [
            {"source": "tasks", "id": "t1", "reason": "Shared tag: wcag"},
            {"source": "resources", "id": "r1", "reason": "Shared tag: wcag"},
        ])

    def test_email_task_connection_accepts_explicit_shared_identifier(self):
        tasks = [{"id": "t1", "title": "Send annual statement", "tags": []}]
        emails = [{"id": "e1", "action": "Reply", "task_id": "t1"}]
        result = find_connections(tasks, [], emails)
        self.assertEqual(result[0]["id"], "email-task:e1:t1")
        self.assertEqual(result[0]["sourceIds"], ["e1", "t1"])

    def test_email_task_connection_requires_strong_title_match_without_identifier(self):
        tasks = [{"id": "t1", "title": "Send annual company statement", "tags": []}]
        emails = [
            {"id": "strong", "action": "Please send the annual company statement"},
            {"id": "weak", "action": "Company news"},
        ]
        result = find_connections(tasks, [], emails)
        email_ids = [item["sourceIds"][0] for item in result]
        self.assertEqual(email_ids, ["strong"])

    def test_explicit_task_identifier_is_authoritative_over_title_match(self):
        tasks = [
            {"id": "wrong", "title": "Send annual company statement", "tags": []},
            {"id": "right", "title": "Different task", "tags": []},
        ]
        emails = [{"id": "e1", "action": "Send annual company statement", "task_id": "right"}]
        result = find_connections(tasks, [], emails)
        self.assertEqual(result[0]["sourceIds"], ["e1", "right"])

    def test_connection_detection_does_not_mutate_sources(self):
        tasks = [{"id": "t1", "title": "Task", "tags": ["Project"]}]
        resources = [{"id": "r1", "title": "Resource", "tags": ["Project"]}]
        emails = [{"id": "e1", "action": "Task", "task_id": "t1"}]
        before = copy.deepcopy((tasks, resources, emails))
        find_connections(tasks, resources, emails)
        self.assertEqual((tasks, resources, emails), before)


if __name__ == "__main__":
    unittest.main()
