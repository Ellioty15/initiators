---
layout: post
title: Dashboard breakdown documentation
permalink: /docs/dashboardbreakdown
---

# The dashboard.html file - issues:
- There are currently 1980 lines of code inside the dashboard .html file
- The size of the file makes the dashboard file is difficult to work with, since the dashboard has six different tabs 
- To optimize workflows and efficiency of the dashboard section on pages, the file will be split, moving code to different files

# the process:
- dashboard.html will stay to hold the structure, and the following files are added:
    - githubanalytics.html
    - gradepredictor.html
    - gradeanalytics.html
    - feedback.html
    - dashboardhelp.html
    - preferences.html


# the changes:
- lines x-x: githubanalytics.html
- lines x-x