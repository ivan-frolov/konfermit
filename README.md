# This is the test work for Konfermit

The main logic of test work is stored in directory src/core,
I see on this test work as an ability to test something new,
this why I chose react as interface to show the work of main module.
I have never used before react, this why, it could be painful to look
at this part of work. But, in my opinion, it's not so important,
because of the main part will be written as standalone module in vanilla js(es6)
(no any modules included, all is done myself).

In root directory there is UML diagram Core.jpg which represent all classes
and connections, I think it will be helpful to look first on it.

In root directory there is UML diagram Core.jpg which represent all classes
and connections, I think it will be helpful to look first on it.

There is a lot of unclear sides in this task (there is no any details about
implementation and business logic) this why It is up to me what the logic a
basket will have. The key moments is undo redo operations + discount
calculation. To implement undo redo operations there is a two common ways: 
1. provide two actions on each method --undo --redo which is difficult and blowing
up the codebase for nothing. 
2. Copy all current state and preserve it in memory.
I decided two use the second way.
The discount may depends on many factors as amount of cart, the products in it,
the weather? and so on... this why it's done as promise which can accumulate
all business logic inside, more over the discount should be calculated at
backend side (especially to not show the logic of work on client side and to not
implement it twice) this why it's good place to put all related ajax here.

The React with Redux can help in this test work, more over this task is preferably
done fully on this framework, but I use it as presenter of main module not more.
It can looks strange, but this approach was chosen specially to show the ability
to write on pure js and solve programming tasks.

To run project u can: npm i && npm run start
