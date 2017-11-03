import categories from '../assets/categories';
import questions from '../assets/questions';
import Question from '../models/Question';
import Category from '../models/Category';

export default () => {
  console.log('Executing seed script...')

  const categoryProm = Category.count().then(result => {
    if (result < 1) {
      console.log("Inserting categories..")
      const cats = categories.map(cat => new Category(cat));
      cats.forEach(cat => {
        cat.save();
      });
    }
    else {
      console.log("SKIP: Inserting categories (already exists)")
    }
  }).catch(err => {
    console.log(`ERROR: Could not count categories collection. ${err}`)
  })

  const questionProm = Question.count().then(result => {
    if (result < 1) {
      console.log("Inserting questions...")
      const questionModels = questions.map(question => new Question(question));
      questionModels.forEach(model => {
        model.save().catch(err => {
          console.log(`Could not insert ${model._id}: ${err}`)
        })
      })
    }
    else {
      console.log("SKIP: Inserting questions (already exists)")
    }
  }).catch(err => {
    console.log(`ERROR: Could not count questions collection. ${err}`)
  })

  Promise.all([categoryProm, questionProm]).then(() => {
    console.log("Seed script finished")
  });
}