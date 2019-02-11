'use strict';
console.clear(); // clear out possible console log garbage

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
Guess a movie I've watched

For each true/false question, take a prompt which allows a range of affirmative
and negative responses.
Each correct response increments questions_correct.

At the very end, print all responses and the number correct out of answers.length
Random integer is from 1 to 20. Math.random() returns in a range [0,1), so multiply
by 20, to get from [0,19), then add 1 to get 1 to 20.
*/
console.log('declaring variables');

// Math.random() returns a number between 0 and 1, not including 1
// Multiply by 20 to get from 0 to 20, not in cluding 20
// Add 1 to make it 1 to 20
var random_number = Math.floor(Math.random() * 20) + 1;

// JavaScript DOM: document.querySelector() uses a CSS selector to return a node
// on the webpage. This node object can be used to let you access the items on
// the HTML page.
// For example, game_section.innerHTML lets you get or set the HTML inside of the
// game section.
var game_section = document.querySelector('#game_section');
var game_question_template = document.querySelector('#question_template');

var questions = [
  'Do I like games?',
  'How about trees, are they cool?',
  'Would I like a cookie?',
  'Is napping an important part of my day?',
  'Coding is cool, right?',
  'Guess an integer between 1 and 20',
  'What is a movie that I\'ve watched?'
];
var answers = [
  true,
  true,
  true,
  false,
  true,
  random_number,
  [
    'The Matrix',
    'Big Trouble In Little China',
    'Serenity',
    'Fellowship Of The Ring',
    'Venom',
    'Kingsmen',
    'Fast and Furious',
    'Zootopia',
    'The Fantastic Mr. Fox',
    'Black Panther'
  ]
];
var responses = [];
var results = [];
var username;
var questions_correct = 0;
var number_of_questions = questions.length;

console.log('variables instantiated');

function get_username() {
  console.log('username request begin');
  // Ask for their name
  username = prompt('What is your name?');
  console.log('Asked for username. Var username : ' + username);

  // Validate their name: accept any string, reject '' and null
  // Validate two additional times, then give a bunk name. Still a fan of
  // 'George McSqueeb'.

  console.log('validating username');
  if (username === '' || username === null) {
    console.log('username is \'\' or null, asking again');

    for (var retry_number = 1; retry_number < 2; retry_number++) {
      console.log('this is retry ' + retry_number);
      username = prompt('No, really, please give a name. Retry #' + retry_number);
      console.log('Prompted again. received: ' + username);

      if (username !== '' && username !== null) {
        console.log('good response received :', username);
        break; // This means they've given a good response, so break the while loop
      }
    }
    if (username === '' || username === null) {
      console.log('no good response, give them something they\'ll regret');
      username = 'George McSqueeb';
    }
    console.log('username: ' + username);
  }
  console.log('username request complete');
}

function run_game() {
  console.log('entering game function, declaring game runtime variables');
  // regular expressions are a fancy way of matching and explanation of their use
  // is beyond the scope of this document.
  // Find more information at https://www.regular-expressions.info/quickstart.html
  // Also at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
  var valid_yes = [
    /^\s*y\s*$/i,
    /^\s*y[eauai][ps]?\s*$/i,
    /^\s*true\s*$/i,
    /^\s*t\s*$/i,
    /^\s*affirmative\s*$/i,
    /^\s*absolutely\s*$/i
  ];
  var valid_no = [
    /^\s*n\s*$/i,
    /^\s*n[oa]y?\s*$/i,
    /^\s*nope?\s*$/i,
    /^\s*nyu\s*$/i,
    /^\s*false\s*$/i,
    /^\s*f\s*$/i,
    /^\s*negative\s*$/i,
    /^\s*negatory\s*$/i
  ];
  var yes_or_no = 'Y/Yes/True/T or N/No/False/F';
  var current_input, current_type;
  var retry_number = 0;
  var correct = false;

  console.log('variables declared, begin game question function definitions');

  // This function takes in an array of regexs and iterates through the array
  // to test the string against them. Returns true/false.
  function test_regex_array (regex_array, test_string) {
    console.log('test_regex_array function');
    console.log('testing string:', test_string, '\nagainst regex array', regex_array);

    for (var ni = 0; ni < regex_array.length; ni++) {
      if (regex_array[ni].test(test_string)) {
        console.log(regex_array[ni], 'matched, returning true');
        return true;
      }
      console.log(regex_array[ni], 'not matched, next element');
    }
    console.log('test_regex_array complete, returning false');
    return false;
  }

  // This function asks questions for answer type boolean. Returns nothing, but
  // will push input to the responses array and will push either 'Correct!' or 
  // 'WRONG!' to the results array.
  function boolean_question (qindex) {
    correct = false; // Always assume they didn't give a correct answer, so we
    // only really need to test for true cases.
    console.log('begin boolean_question type, one guess allowed');
    console.log('index #', qindex);

    current_input = prompt(questions[qindex] + '\n' + yes_or_no);
    console.log('asked boolean question: ' + questions[qindex], '\ninput: ' + current_input);

    // for each element in the valid_(yes or no) test array, test the input to see if
    // it is valid. regex_var.test(string) will return true if the string is
    // matched by the regex, so push the input to the responses array
    // and push a positive result to the results array.
    console.log('validating input');
    if (answers[qindex]) { // true answers case
      console.log('answer true, calling test_regex_array(valid_yes, current_input)');
      correct = test_regex_array(valid_yes, current_input);
    } else { // false answers case
      console.log('answer false, calling test_regex_array(valid_no, current_input)');
      correct = test_regex_array(valid_no, current_input);
    }

    // Input validated, now do something:
    console.log('input validated, correct:', correct);
    if (correct) {
      responses.push(current_input);
      results.push('Correct!');
      questions_correct++;
    } else {
      // need to check if current_input is null; if it is, set current_input=''
      if (current_input === null) current_input = '';
      responses.push(current_input);
      results.push('WRONG!');
    }
    console.log('boolean question complete, response and results pushed');
  }

  // This function takes current question index and total number of guesses, returns
  // nothing, tests to see if input matches answer
  function number_question (qindex, allowed_guesses) {
    console.log('begin number_question type,', allowed_guesses, 'guesses. answer is', answers[qindex]);
    console.log('index #', qindex);
    correct = false;
    retry_number = 0;

    current_input = prompt(questions[qindex]);
    console.log('asked:', questions[qindex], '\nreceived:', current_input);

    // test input. if it's not a number, if it's blank, or if it's wrong, ask
    // again. if it's correct, push input to responses array and a good result
    // to results array also, if it's not the correct number, ask again.
    console.log('validating input');
    if (isNaN(current_input * 1) || current_input === '' || (current_input * 1) !== answers[qindex]) {
      console.log('input is not a number or is not correct, ask again');

      for (retry_number = 1; retry_number < allowed_guesses; retry_number++) {
        console.log('entering retry loop. retry_nubmer:', retry_number + '.');
        current_input = prompt('Incorrect. Please try again. Retry #' + retry_number);
        console.log('asked again. received:', current_input);

        // If they gave a good answer, push it and break loop, otherwise continue
        // loop and ask again.
        if ((current_input * 1) === answers[qindex]) {
          console.log('good response received, correct=true, break loop');
          correct = true;
          break;
        }
        console.log('no good response received, next loop iteration');
      }
      console.log('retry loop completed after', retry_number, 'retries');
    } else correct = true; // first response is correct! Somehow! Cheaters!

    // Input tests complete, now do something with it.
    console.log('input validated, correct:', correct);
    if (correct) {
      responses.push(current_input);
      var str = '';
      if (retry_number === 0) str = 'only one guess!';
      else str = (retry_number + 1) + ' guesses.';
      results.push('Correct! It took you ' + str);
      questions_correct++;
    } else {
      // need to check if current_input is null; if it is, set current_input=''
      if (current_input === null) current_input = '';
      responses.push(current_input);
      results.push('After ' + allowed_guesses + ' guesses, you didn\'t get it!');
    }
    console.log('end number question, response and results pushed');
  }


  // ARRAY QUESTION FUNCTION DEFINITION
  // Takes current question number (to access question and answer arrays) and
  // number of guesses allowed. Returns nothing. If a guess is correct, will push
  // that input to responses array, and pushes correct to results array. After
  // number of allowed guesses, pushes the final guess onto the responses array,
  // and pushes incorrect to results array.
  function array_question (qindex, allowed_guesses) {
    console.log('begin array_question type,', allowed_guesses, 'guesses. answers are:', answers[qindex]);
    console.log('index #', qindex);
    correct = false;
    retry_number = 0;
    var answer_regex_array = [];

    //build test array
    for (var ij = 0; ij < answers[qindex].length; ij++) {
      answer_regex_array.push( new RegExp(answers[qindex][ij], 'i') );
    }

    current_input = prompt(questions[qindex]);
    console.log('asked:', questions[qindex], '\nreceived:', current_input);

    //test input
    console.log('validating input');
    //if bad, check from retry_number = 1 to retry_number < guesses
    if (!test_regex_array(answer_regex_array, current_input)) {
      console.log('input does not match one of the answers');

      // ask the correct number of times, retry_number 1 to < guesses
      for (retry_number = 1; retry_number < allowed_guesses; retry_number++) {
        console.log('entering retry loop. retry_number:', retry_number);
        current_input = prompt('Incorrect. Please try again. Retry #' +
          retry_number + '\n' + questions[qindex]);
        console.log('asked again. received:', current_input);

        // if input received matches an answer, set correct=true, break loop
        if (test_regex_array(answer_regex_array, current_input)) {
          console.log('good response received, correct=true, break loop');
          correct = true;
          break;
        }
        console.log('no good response received, next loop iteration');
      }
      console.log('retry loop completed after', retry_number, 'retries');
    } else correct = true; // Somehow guessed right the first time...

    // Input tested, push results and input
    console.log('input vaidated, correct:', correct);
    if (correct) {
      responses.push(current_input);
      var str = '';
      if (retry_number === 0) str = 'only one attempt!';
      else str = (retry_number + 1) + ' attempts.';
      results.push('Correct! It took you ' + str);
      questions_correct++;
    } else {
      // need to check if current_input is null; if it is, set current_input=''
      if (current_input === null) current_input = '';
      responses.push(current_input);
      results.push('You used ' + allowed_guesses + ' guesses and none were correct...');
    }
    console.log('end array question, response and results pushed');
  }

  console.log('game functions defined, begin game');
  console.log('number of questions to be asked:', number_of_questions);

  console.log('begin main game loop');
  for (var i = 0; i < number_of_questions; i++) {
    console.log('entered game loop, determining answer type');
    current_type = typeof(answers[i]);
    console.log('current type is:', current_type);

    // The current answer type determines which type of question is asked
    switch (current_type) {
    case 'boolean':
      console.log('calling boolean question for #', (i + 1));
      boolean_question(i);
      break;
    case 'number': // number answers give 4 guesses
      console.log('calling number question for #', (i + 1));
      number_question(i, 4);
      break;
    case 'object': // array-based answers give 6 guesses
      console.log('calling array question for #', (i + 1));
      array_question(i, 6);
    }
  }
  console.log('Game complete. responses:', responses, '\nresults:', results);
  console.log(questions_correct, 'correct out of', number_of_questions, 'total');
}

function build_results_page(){
  console.log('build results page function start');
  console.log('build results page function finish');
}

// get_username();
run_game();
build_results_page();

/* Based on the number of questions, dynamically generate the list of questions,
my answers, and their recorded response.
Depending on the data type of the answer, we'll have to do a couple things.
Boolean, the string added to the textContent will need to be created.
true = 'Yes', false = 'No'
*/

// for (var j = 0; j < questions.length; j++) {
//   var question = questions[j];
//   // sometimes answers is a list! If it is, then turn the answer into a list of
//   game_section.innerHTML = game_section.innerHTML + newli_newul_newli + question + endli_newli + answers[ii] + endli_endul_endli;
// }

// Ask for their name
// username = prompt('What is your name?');

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
