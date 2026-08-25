from dataclasses import asdict, dataclass, field
from typing import Any, Dict, List, Optional


class DictModel:
    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)


@dataclass(frozen=True)
class Task(DictModel):
    id: str
    title: str
    due: Optional[str]
    urgent: bool
    description: Optional[str]
    tags: List[str] = field(default_factory=list)


@dataclass(frozen=True)
class EmailSummary(DictModel):
    id: str
    sender: str
    action: str
    deadline: Optional[str]


@dataclass(frozen=True)
class Project(DictModel):
    id: str
    title: str
    status: str
    description: Optional[str]
    tags: List[str] = field(default_factory=list)


@dataclass(frozen=True)
class Resource(DictModel):
    id: str
    title: str
    status: str
    added: Optional[str]
    tags: List[str] = field(default_factory=list)


@dataclass(frozen=True)
class CronJob(DictModel):
    id: str
    name: str
    enabled: bool
    last_status: Optional[str]
    last_run: Optional[str]


@dataclass(frozen=True)
class CronSummary(DictModel):
    vps_scheduler_active: bool
    mac_mirror_paused: bool
    jobs: List[CronJob] = field(default_factory=list)


@dataclass(frozen=True)
class SourceFreshness(DictModel):
    status: str
    checked_at: str
    reason: Optional[str] = None


@dataclass(frozen=True)
class CollectedSources(DictModel):
    tasks: List[Task]
    emails: List[EmailSummary]
    projects: List[Project]
    resources: List[Resource]
    cron: CronSummary
    source_freshness: Dict[str, SourceFreshness]
