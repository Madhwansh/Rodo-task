//Definition for UserActivity.
//Represents user's activity with userId , deviceId , loggedIn , loggedOut , lastSeenAt

type UserActivity = {
  userId: string;
  loggedIn: Date;
  loggedOut: Date;
  lastSeenAt: Date;
};

//takes an array of UserActivity called userActivities
// takes specific month and year as input
//returns object with two properties , loggedIn users and active users

function getMonthlyUsers(
  userActivities: UserActivity[],
  month: number,
  year: number
): { loggedInUsers: number; activeUsers: number } {
  let loggedInUsers = 0;
  let activeUsers = 0;
  let userSet = new Set(); //set object to keep track of unique users

  //for loop to iterate over UserActivity object in the userActivities array
  userActivities.forEach((activity) => {
    if (
      activity.loggedIn.getMonth() === month && //cpndition to check the year and month
      activity.loggedIn.getFullYear() === year
    ) {
      if (!userSet.has(activity.userId)) {
        loggedInUsers++;
        userSet.add(activity.userId);
      }
    }

    if (
      activity.lastSeenAt.getMonth() === month &&
      activity.lastSeenAt.getFullYear() === year
    ) {
      activeUsers++;
    }
  });

  return { loggedInUsers, activeUsers };
}
