# Logs docs - last edit 04.02.24

## TLDR

1. Basics
   1.1 Actions
   1.2 Basic flow

## 1. Basics

### 1.1 Actions

Main component, called 'home' is crucial part of this application. It initializes controllers and manages in game data
flow. Its main controller is called 'LogsController' and it is main interface, that most elements use.

Logs controller has multiple 'actions' embedded inside of it. Lets list them down

- setCanWrite is simple action, provided by logsRenderer, which can lock user's input and prevent him from sending
  messages, before previous log can fully render.

- messagesComponentAction is action provided by Messages components. It can trigger messages component to do some
  action. As component's name applies, its used to control messages flow

- handler is class, which manages actions, triggered by user. LogsController by itself only 'takes' user input, but does
  not directly run it. If user's action is internal and does not require external API communication, it will run it

### 1.1 Basic flow

LogsController has characterState. Its used to tell, what in game character is currently doing. Changing this state will
change, which actions user can run or cannot run. Simple example is setting character's state to 'SendMessageValue' or '
SendMessageTo'. Both states lock user from inputting any other commands, than 'custom input', which in precise mean "
take anything that user inputs, save it and continue". Most of states actually allow user to run "default commands".
Idea behind this is to simulate characters actions in age

Example flow

- User input: "Send message"
- Character's state is being set to 'SendMessageTo', which awaits messages receiver
- User input anything
- System saves that as receiver name and changes user state to 'SendMessageValue'
- User input anything
- User's status is being changed to 'map', which at the time of writing is basic state, that user is locked in. This
  state allows to run all 'generic' actions
