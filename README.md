# Leaderboard for SETU Karting Club

This is a React app to display a simple leaderboard whhich automatically adds student into their categories. I hope for this app to evolve into a full fledged app with a database and a login system. An admin could log in and add students to the databse and update their times.

## Updating times each week

1. Open `tools/admin.html` in Chrome and click **Open times.json** (choose `src/data/times.json`).
2. Optionally load that week's signup sheet so the people who were there are listed first.
3. For each printed slip: type a few letters of the name, Enter, type the time (`22413` works for 22.413), Enter.
   If the name is unreadable, type the time first and pick from the drivers whose usual pace is closest.
4. Click **Save session**, then run `npm run publish-times` to put it on the website.

Slower times are recorded in the session history but never replace a best. To fix a mistake, pick the same
session date again, correct the time and save.
