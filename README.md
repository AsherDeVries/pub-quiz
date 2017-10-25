# Quizzer Design Document

The Quizzer is a web application that can be used in bars, sports canteens and maybe even prisons to play quizzes as a team. A pub quiz, basically.
It consists of 3 client applications and 1 server application.

## Technologies

|Tech|Description|Rationale|
|----|-----------|---------|
|Node.js|Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.||
|Express|Fast, unopinionated, minimalist web framework for Node.js.||
|React|Fast, composable client-side components.||
|MongoDB|MongoDB is an open-source, document database designed for ease of development and scaling.||
|Websocket|A computer communications protocol, providing full-duplex communication channels over a single TCP connection.||
|Mongoose|Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.|For easy schema creation and validation|
|React UIkit Components|Collection of React components using the UIkit CSS framework.|The programmers have more experience with UIkit|
|Axios|Promise based HTTP client for the browser and node.js.|To prevent callback hell.|
|Mocha Test|Mocha is a feature-rich JavaScript test framework running on Node.js and in the browser, making asynchronous testing simple and fun.||
|Chai|Chai is a BDD / TDD assertion library for node and the browser that can be delightfully paired with any javascript testing framework.|For more readable tests|
|Supertest|The motivation with this module is to provide a high-level abstraction for testing HTTP, while still allowing you to drop down to the lower-level API provided by superagent.||
|SocketIO|Socket.IO enables real-time bidirectional event-based communication.||

## Architecture

The clients primarily use websocket connections for all communication. HTTP requests are only used for retrieving data from the MongoDB backend.

## API Spec & Websocket Message formats

The text below describes the REST api specification of the server. Which endpoints can be accessed, by which url and what there responses look like.

### REST

#### List categories

List all categories which can be used in the quiz.

```GET /categories```

##### Response

```
{
  "name": String
}
```

### Websocket
#### Team App messages to server

##### Apply for Quiz Night

```
{
  quizNightCode: String
  teamName: String
  messageType: teamApplication
}
```

##### Sending answers

```
{
  quizNightCode: String
  teamName: String
  answer: String
  messageType: sendAnswer
}
```

#### Team App messages from server

##### Team Approval status

```
{
  Approved: Boolean
  messageType QuizNightApprovalStatus
}
```

##### Receiving questions

```
{
  category: String
  question: String
  roundNumber: Number
  questionNumber: Number
  messageType: receiveQuestion
}
```
#### Scoreboard App messages from server

##### Scoreboard Overview
```
{
  roundNumber: Number
  questionNumber: Number
  teams: [{
    teamName: String
    roundPoints: Number
    correctAnswers: Number
  }]
  messageType: QuizNightScoreOverview
}
```
##### Question Overview
```
{
  category: String
  question: String
  teams: [{
    teamName: String
    hasSuppliedAnswer: Boolean
  }]
  messageType: QuestionScoreOverview
}
```
##### Question Overview Answers
```
{
  category: String
  question: String
  teams: [{
    teamName: String
    SuppliedAnswer: String
  }]
  messageType: QuestionScoreOverviewWithAnswers
}
```
#### QuizMaster App messages to server

##### Question to ask

```
{
  question: String
  category: String
  messageType: AskQuestion
}
```
#### QuizMaster App messages from server

##### Start quiz night

```
{
  quizNightCode: String
  messageType: StartQuizNight
}
```
##### Team Applications

```
{
  teamName: String
  messageType: TeamApplication
}
```
##### Closing Question

```
{
  correctAnswer: String
  messageType: correctAnswer
}
```

##### Submitted Answers

```
{
  teamName: String
  answer: String
  question: String
  category: String
  messageType: SubmittedAnswer
}
```


### Database structure

