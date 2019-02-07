'use strict';

/*
Guessing game about me
Ask for the person's name (prompt). store in username, should be string
If blank, ask again; if still blank, default to 'George McSquib'

Questions to ask:
Do I like games? (yes)
How about trees, are they cool? (yes)
Would I like a cookie? (yes)
Is napping an important part of my day? (no)
Coding is cool, right? (yes)

For each question, take a prompt which allows only four results, two true and
two false:
true: 'y', 'yes'
false: 'n', and 'no'
All other responses will default to an incorrect result, whatever that may be
Capitalization doesn't matter, the toLowerCase() method gets called
for all responses.
During response checks, correct responses are normalized: 'yes' or 'no' are
the only two responses any of these variables should end up with at the end.

Each correct response increments count.

At the very end, print all responses and the number correct out of 5
*/

var username, games, trees, cookie, nap, coding, count = 0;

// Ask for username
username = prompt('What is your name?');
console.log('username:' + username);

// If no username (or they click cancel), then ask again
if (username === '' | username === null) {
  username = prompt('No, really, what\'s your name?');
  console.log('username:' + username);
}
if (username === '' | username === null) {
  username = 'George McSqueeb';
  console.log('username:' + username);
}
alert('Good to meet you, ' + username + '. Let\'s play a game!');

// Do I like games? (yes)
// Store result in games
games = prompt('Do I like games? Y/Yes or N/No');
console.log('games:' + games);

// Anything other than a string counts as no, store 'no' in games
if (typeof(games) !== 'string') {
  games = 'no';
  console.log('games:' + games);
}

// Games is guaranteed to be a string at this point. Convert to lowercase.
// Check for 'yes' cases, otherwise change games to 'no'
games = games.toLowerCase();
console.log('games:' + games);
switch (games) {
case 'y':
case 'yes':
  games = 'yes';
  count++;
  console.log('games:' + games, 'count:' + count);
  break;
default:// anything else
  games = 'no';
  console.log('games:' + games, 'count:' + count);
}


