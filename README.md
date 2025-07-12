# Planique

<div align="center">
  <img src="public/favicon.ico" alt="Planique Logo" />
</div>

**Planique** is a modern executive insights platform that transforms GitHub project activity into clear, business-friendly reports and visualizations. Designed specifically for non-technical stakeholders like CEOs, project managers, and operations leads, Planique connects directly to GitHub and reveals the bigger picture—without requiring any technical background.

At its core, Planique turns raw development data into strategic insight. It automatically aggregates information across multiple repositories and GitHub projects, analyzes timelines, milestones, and contributor activity, and presents everything through a sleek, interactive dashboard. Users can easily track weekly and monthly performance, monitor overdue tasks, understand project health, and drill down into specific milestones or teams—all from one unified workspace.

With Planique, decision-makers no longer need to ask for updates or sift through technical tools. Instead, they gain instant visibility into what matters: how work is progressing, which teams are contributing the most, which milestones are at risk, and where bottlenecks exist. Every view supports export to Excel or PDF, making reporting effortless for board meetings, investor reviews, or internal strategy sessions.

Planique isn’t just a project dashboard. It’s an open canvas for clarity, control, and confidence in your product delivery lifecycle.

## Features

### Repository-Level Features

1. **List All Repositories**

   - Fetches all repositories within an organization or user account.
   - Shows name, visibility (public/private), description, language, and creation/update timestamps.
   - Export: CSV/XLSX

2. **Repository Activity Summary**

   - Displays commit count, push frequency, and latest commit for each repository.
   - Export: Weekly/monthly summaries

3. **Repository Contributors**

   - Lists contributors for each repository along with commit count.
   - Useful for identifying top performers.
   - Export: Contributor stats (commits, additions, deletions)

4. **Languages Used**

   - Retrieves the language distribution per repository using GitHub’s language breakdown API.
   - Export: Language usage per repo

5. **Repository Topics**

   - Shows custom tags/topics (e.g., `ai`, `mobile`, `frontend`) assigned to each repo.
   - Helps categorize projects thematically.
   - Export: Topic list per repo

6. **Stargazers, Watchers, Forks**

   - Shows basic popularity metrics.
   - Export: Popularity stats over time

### 📦 Project-Level Features (GitHub Projects v2)

7. **List All GitHub Projects**

   - Lists all GitHub Projects at organization or repository level.
   - Shows title, description, columns, and associated items.
   - Export: Project metadata and structure

8. **Project Progress Overview**

   - Aggregates open/closed issues per project and per column.
   - Export: % complete, tasks remaining, overdue tasks

9. **Project Milestones**

   - Lists all milestones tied to issues or pull requests.
   - Includes title, due date, description, open/closed issue counts.
   - Export: Milestone timeline

10. **Project Item Details**

    - Drill-down into specific issues/cards within a project.
    - Export: Full project with tasks, status, assignees

### Issue/Task-Level Features

11. **List Issues by Repository**

    - Lists open/closed issues per repository.
    - Includes labels, status, assignee, created/closed dates.
    - Export: Weekly/monthly issue logs

12. **Overdue Issues & Tasks**

    - Identifies issues past their due dates (via `due_on` field in milestones).
    - Export: Overdue task list with reasons (if tagged)

13. **Issue Status Trends**

    - Graphs weekly issues created vs closed.
    - Export: Time series CSV

14. **Labels & Tag Analytics**

    - Aggregates issue labels (e.g., `bug`, `enhancement`, `urgent`) to show what teams are working on.
    - Export: Label usage report

15. **Assignee Workload View**

    - Shows task distribution by user across repos or projects.
    - Export: Per-user task stats

16. **Linked Issues to Milestones**

    - Groups issues under milestones for progress tracking.
    - Export: Milestone → issues matrix

### Team-Level Features

17. **List Organization Members**

    - Shows all members of a GitHub organization (if authenticated properly).
    - Export: Members with roles

18. **Contribution Metrics per User**

    - Commits, PRs, Issues, Reviews per user over a time range.
    - Export: Leaderboard

19. **User Activity Heatmap**

    - Activity graph similar to GitHub’s profile heatmap.
    - Export: Calendar data (if scraped or approximated)

20. **Inactive Contributors**

    - Detect users with zero contributions in the last 30 days.
    - Export: Inactivity report

### Analytics & Reports

21. **Weekly Summary Report**

    - Includes: issues created, issues closed, top contributors, active projects.
    - Export: Executive summary (PDF, Excel)

22. **Project Health Dashboard**

    - Shows open/closed task ratio, overdue items, progress bars per project.
    - Export: Visual + data (PDF + XLSX)

23. **Milestone Completion Rates**

    - Tracks how on-time teams are at completing milestones.
    - Export: Completion trends

24. **Task Aging Report**

    - Shows how long tasks have remained open.
    - Export: Sorted by age

25. **Weekly Digest Email**

    - Sends a report to the CEO’s inbox automatically.
    - Export: Email-based report only

### Export Features (Supported Across Pages)

- **Download as Excel (.xlsx)**
- **Download as CSV (.csv)**
- **Generate PDF Summaries**
- **Bulk Export Entire Workspace**

  - Export all repos, projects, tasks, contributors, and milestone data at once.

- **Scheduled Exports**

  - Allow CEO to schedule weekly/monthly exports automatically.

### Optional Advanced Features (with extra logic or integration)

26. **Slack/Email Notifications**

    - Alert for overdue tasks, milestone deadlines, weekly summaries.
    - Export: N/A (Alert-only)

27. **Custom Report Builder**

    - Select specific filters (repos, users, tags) and export only those.
    - Export: Custom dataset

28. **Project Timeline Gantt Generator**

    - Build Gantt-style charts from milestones and issue due dates.
    - Export: Image/PDF of Gantt chart
