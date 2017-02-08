# TEST 1

For this test you will have to use the attached json file called tournament.json representing a simple list of tournaments.

We want you to sort those datas into a fully responsive grid and to show a list of tournaments.

For every items of this list, those are the MVP features we want you to implement :
- What ever screen resolution that you have you must always show those fields ( if a field is missing into the datas, the column must still stay but just leave the cell empty ) :
  - the tournament name
  - the start date
  - the city location
- On large screen resolution we would like you to show some weather information like the temperature.
  - You can use this api to provide some location information : https://maps.googleapis.com/maps/api/geocode/json but it is rate limited. We would like you to implement something which can handle this.
  - We dont care about the real weather information so you can mock the result and just show to us a temperature. How can you chain the location and the weather calls together is what matter the most in this test.

This test require you to show us your skills with angularJS ( version 1.5 maximum ) but also your css ones.
You can write the test in ES5 but ES6 is much more appreciated.

We will take care about :
- Your Architecture decisions
- Your HTML implementation
- Your design skills
- Your functional programming skills will matter
- How do you test all of this

You can use any library and tools that you think will be usefull for building this application. This test should take you two hours maximum. We want you to provide a fully ready to go in production solution so please provide all the documentation we should need to make it work.