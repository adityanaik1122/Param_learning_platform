"""
Import the .NET Bootcamp syllabus from an HTML file into the syllabus models.

This script:
- Reads the HTML file containing the .NET course syllabus
- Extracts modules (as Phases) and topics (as Lessons)
- Creates Phase records per module and Lesson records per topic
- Maps to the 'mean' course_id (Full Stack Web Development - .Net & Angular)
"""

import os
import re

import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")
django.setup()

from syllabus.models import Phase, Lesson  # noqa: E402

DEFAULT_HTML_PATH = os.path.expanduser(
    r"C:\Users\Admin\Downloads\deepseek_html_20260309_ddf89e.html"
)

COURSE_ID = "mean"


def read_html(html_path: str) -> str:
    """Read the HTML file and return its contents."""
    if not os.path.exists(html_path):
        raise SystemExit(f"HTML file not found at: {html_path}")

    with open(html_path, "r", encoding="utf-8") as f:
        return f.read()


def extract_modules(html: str):
    """
    Extract modules from the HTML.

    Each module is a <div class="module-card"> block containing:
      - A header <h3> with the module title
      - An objective paragraph
      - A table of topics with explanation and code columns

    Returns a list of dicts:
      {
        "title": str,
        "objective": str,
        "topics": [{"topic": str, "explanation": str, "code": str}, ...]
      }
    """
    modules = []

    # Split by module-card divs (handles truncated HTML gracefully)
    parts = re.split(r'<div\s+class="module-card">', html)
    cards = parts[1:]  # skip everything before first module-card

    for card_html in cards:
        # Extract module title from <h3>
        h3_match = re.search(r"<h3[^>]*>(.*?)</h3>", card_html, re.DOTALL)
        if not h3_match:
            continue
        raw_title = h3_match.group(1)
        # Strip HTML tags and clean up
        title = re.sub(r"<[^>]+>", "", raw_title).strip()

        # Extract objective
        obj_match = re.search(
            r'<div\s+class="module-objective"[^>]*>(.*?)</div>', card_html, re.DOTALL
        )
        objective = ""
        if obj_match:
            objective = re.sub(r"<[^>]+>", "", obj_match.group(1)).strip()
            # Remove the "Objective:" prefix
            objective = re.sub(r"^Objective:\s*", "", objective).strip()

        # Extract topics by finding all topic-cell td elements directly
        # (avoids issues with nested HTML inside code examples)
        topics = []
        topic_cells = list(
            re.finditer(
                r'<td\s+class="topic-cell"[^>]*>(.*?)</td>', card_html, re.DOTALL
            )
        )
        for i, topic_match in enumerate(topic_cells):
            topic_name = re.sub(r"<[^>]+>", "", topic_match.group(1)).strip()

            # Determine the region after this topic cell up to the next topic cell
            start = topic_match.end()
            end = topic_cells[i + 1].start() if i + 1 < len(topic_cells) else len(card_html)
            region = card_html[start:end]

            # Extract explanation from region
            expl_match = re.search(
                r'<td\s+class="explanation-cell"[^>]*>(.*?)</td>', region, re.DOTALL
            )
            explanation = ""
            if expl_match:
                explanation = re.sub(r"<[^>]+>", "", expl_match.group(1)).strip()

            # Extract code example - try closed tag first, fall back to open-ended
            code_match = re.search(
                r'<td\s+class="code-cell"[^>]*>(.*?)</td>', region, re.DOTALL
            )
            if not code_match:
                # Handle truncated HTML where closing </td> is missing
                code_match = re.search(
                    r'<td\s+class="code-cell"[^>]*>(.*)', region, re.DOTALL
                )
            code = ""
            if code_match:
                code = re.sub(r"<[^>]+>", "", code_match.group(1)).strip()

            topics.append(
                {"topic": topic_name, "explanation": explanation, "code": code}
            )

        if title:
            modules.append(
                {"title": title, "objective": objective, "topics": topics}
            )

    return modules


def import_dotnet_syllabus(html_path: str = DEFAULT_HTML_PATH):
    print(f"Reading .NET syllabus from: {html_path}")
    html = read_html(html_path)
    modules = extract_modules(html)

    if not modules:
        raise SystemExit("No modules found in the HTML file.")

    print(f"Found {len(modules)} modules. Importing into database...")

    # Remove existing phases/lessons for this course to avoid duplicates
    existing_phases = Phase.objects.filter(course_id=COURSE_ID)
    if existing_phases.exists():
        count = existing_phases.count()
        existing_phases.delete()
        print(f"Removed {count} existing phase(s) for course '{COURSE_ID}'.")

    for mod_idx, module in enumerate(modules, start=1):
        # Create Phase for each module
        phase = Phase.objects.create(
            course_id=COURSE_ID,
            title=module["title"][:200],
            description=module["objective"],
            order=mod_idx,
            is_premium=False,
        )
        print(f"  Created Phase {mod_idx}: {phase.title}")

        # Create Lessons for each topic in the module
        lessons = []
        for topic_idx, topic in enumerate(module["topics"], start=1):
            lessons.append(
                Lesson(
                    phase=phase,
                    title=topic["topic"][:200],
                    content=topic["explanation"],
                    code_example=topic["code"],
                    order=topic_idx,
                    duration_minutes=45,
                )
            )

        if lessons:
            Lesson.objects.bulk_create(lessons)
            print(f"    -> {len(lessons)} lesson(s) created")

    total_lessons = sum(len(m["topics"]) for m in modules)
    print(f"\nDone! Imported {len(modules)} modules with {total_lessons} total lessons.")


if __name__ == "__main__":
    html_path = os.environ.get("DOTNET_SYLLABUS_HTML", DEFAULT_HTML_PATH)
    import_dotnet_syllabus(html_path)
