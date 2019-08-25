# Fibonacci

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.0.

## Demo

[Click here to see a running demo of this project](http://52.62.237.183/fibonacci)

## Requirements

1. On startup, the program will prompt the user for the number of seconds (X) between outputting the frequency of each number to the screen.
2. Every X seconds the program will display, in frequency descending order, the list of numbers and their frequency.
3. If the user enters 'halt' the timer should pause.
4. If the user enters 'resume' the timer should resume.
5. If the user enters a number that is one of the first 1000 Fibonacci numbers, the system should alert "FIB"
6. If the user enters 'quit', the application should output the numbers and their frequency, a farewell message, and finally terminate.

## Code Features

A behaviour subject is used to subscribe to the text input. A minimum of 3 characters must be entered before triggering the API call. A debounce time of 500ms is used to the user has time to finish typing before triggering the API call (the app shouldn't call the API on every keystroke, unless the user is a slow typer!). 

The input also makes use of the **distinctUntilChanged()** function which will prevent the API call from triggering unless the input has changed after the debounce time (e.g. entering 'E' then 'Backspace' then 'E' will *not* trigger the API call).

A custom date filter is used to change the article time from ZULU format to a human-readable format.

For style points, Bootstrap is used and the articles are given a different colour depending on their popularity.
