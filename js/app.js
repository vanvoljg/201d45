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
Guess a random integer between 1 and 20: (random())

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

At the very end, print all responses and the number correct out of answers.length
Random integer is from 1 to 20. Math.random() returns in a range [0,1), so multiply
by 20, to get from [0,19), then add 1 to get 1 to 20.
*/

var username, games, trees, cookie, nap, coding, count = 0;
var random_number = Math.floor(Math.random() * 20) + 1;
var random_display = document.getElementById('random_display');
var questions = [
  'Do I like games? Y/Yes or N/No',
  'How about trees, are they cool?',
  'Would I like a cookie?',
  'Is napping an important part of my day?',
  'Coding is cool, right?',
  'Guess an integer between 1 and 20',
  'What is a movie that I\'ve watched?'
];
var answers = [
  'Yes', 'Yes', 'Yes', 'No', 'Yes', random_number,
  [
    'The Matrix',
    'Big Trouble In Little China',
    'Serenity',
    'Fellowship Of The Ring',
    'Venom',
    'Kingsmen',
    'Fast and Furious',
    'Zootopia',
    'The Fantastic Mr. Fox'
  ]
];
var responses = [];

random_display.innerText = random_number;

// // Ask for username
// console.log('Ask for name. var username');
// username = prompt('What is your name?');
// console.log('username:' + username);

// // If no username (or they click cancel), then ask again
// if (username === '' | username === null) {
//   console.log('username is invalid, ask again');
//   username = prompt('No, really, what\'s your name?');
//   console.log('username:' + username);
// }
// if (username === '' | username === null) {
//   console.log('username still invalid, so using default');
//   username = 'George McSqueeb';
//   console.log('username:' + username);
// }
// alert('Good to meet you, ' + username + '. Let\'s play a game!');

// // Do I like games? (yes)
// // Store result in games
// console.log('Ask if I like games. var games')
// answers[0] = prompt(questions[0]);
// console.log('games:' + answers[0]);

// // Anything other than a string counts as no, store 'no' in games
// if (typeof(games) !== 'string') {
//   answers[0] = 'no';
//   console.log('games:' + answers[0]);
// }

// // Games is guaranteed to be a string at this point. Convert to lowercase.
// // Check for 'yes' cases, otherwise change games to 'no'
// games = answers[0].toLowerCase();
// console.log('games:' + games);
// switch (games) {
// case 'y':
// case 'yes':
//   games = 'yes';
//   count++;
//   console.log('games:' + games, 'count:' + count);
//   break;
// default:// anything else
//   games = 'no';
//   console.log('games:' + games, 'count:' + count);
// }

// // How about trees, are they cool? (yes)
// // Store result in trees
// trees = prompt('How about trees, are they cool? Y/Yes or N/No');
// console.log('trees:' + trees);

// // Check for string, otherwise store 'no' in trees
// if (typeof(trees) !== 'string') {
//   trees = 'no';
//   console.log('trees:' + trees);
// }

// // Trees is a string; make it lowercase; check for 'yes' cases, otherwise
// // store 'no' in trees
// trees = trees.toLowerCase();
// console.log('trees:' + trees);
// switch (trees) {
// case 'y':
// case 'yes':
//   trees = 'yes';
//   count++;
//   console.log('trees:' + trees, 'count:' + count);
//   break;
// default: // anything else
//   trees = 'no';
//   console.log('trees:' + trees, 'count:' + count);
// }

// // Would I like a cookie? (yes)
// // Store result in cookie
// cookie = prompt('Would I like a cookie? Y/Yes or N/No');
// console.log('cookie:' + cookie);

// // Check if string; otherwise store 'no' in cookie
// if (typeof(cookie) !== 'string') {
//   cookie = 'no';
//   console.log('cookie:' + cookie);
// }

// // Make cookie lowercase, check for 'yes' cases, otherwise cookie = 'no'
// cookie = cookie.toLowerCase();
// console.log('cookie:' + cookie);
// switch (cookie) {
// case 'y':
// case 'yes':
//   cookie = 'yes';
//   count++;
//   console.log('cookie:' + cookie, 'count:' + count);
//   break;
// default:
//   cookie = 'no';
//   console.log('cookie:' + cookie, 'count:' + count);
// }

// // Is napping an important part of my day? (no)
// // Store result in nap
// nap = prompt('Is napping an important part of my day? Y/Yes or N/No');
// console.log('nap:' + nap);

// // If nap is not a string, make nap = 'yes'
// if (typeof(nap) !== 'string') {
//   nap = 'yes';
//   console.log('nap:' + nap);
// }

// // Make nap lowercase, check for 'no' cases, increment count
// // otherwise nap = no, do not increment count
// nap = nap.toLowerCase();
// console.log('nap:' + nap);
// switch (nap) {
// case 'n':
// case 'no':
//   nap = 'no';
//   count++;
//   console.log('nap:' + nap, 'count:' + count);
//   break;
// default:
//   nap = 'yes';
//   console.log('nap:' + nap, 'count:' + count);
// }

// // Coding is cool, right? (yes)
// coding = prompt('Coding is cool, right? Y/Yes or N/No');
// console.log('coding:' + coding);

// // If coding is not a string, make coding = 'no'
// if (typeof(coding) !== 'string') {
//   coding = 'no';
//   console.log('coding:' + coding);
// }

// // Make coding lowercase, check for 'yes' cases, otherwise coding = no
// coding = coding.toLowerCase();
// console.log('coding:' + coding);
// switch (coding) {
// case 'y':
// case 'yes':
//   coding = 'yes';
//   count++;
//   console.log('coding:' + coding, 'count:' + count);
//   break;
// default:
//   coding = 'no';
//   console.log('coding:' + coding, 'count:' + count);
// }

// // Game complete, now display results.
// // Pop up an alert with all given responses and the user's final score
// alert('Hey, ' + username + ', you finished the game! Let\'s see how you did.');
// alert('Question 1: "Do I like games?" You said ' + games + '\n\
// Question 2: "How about trees, are they cool?" You said ' + trees +'\n\
// Question 3: "Would I like a cookie?" You said ' + cookie + '\n\
// Question 4: "Is napping an important part of my day?" You said ' + nap + '\n\
// Question 5: "Coding is cool, right?" You said ' + coding);
// alert('You got ' + count + ' of 5 correct');
// // Then add some flavor for how well they did
// switch (count) {
// case 0:
//   alert('I don\'t think you know me at all....');
//   break;
// case 1:
//   alert('Not so good....');
//   break;
// case 2:
//   alert('Fewer than half correct.');
//   break;
// case 3:
//   alert('More than half right. Not too bad.');
//   break;
// case 4:
//   alert('Only one wrong, nice!');
//   break;
// default:
//   alert('You got them all right! Great!');
// }
