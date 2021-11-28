/**
 * Created by Tomasz Gabrysiak @ Infermedica on 08/02/2017.
 */

const template = (context) => {
  return new Promise((resolve) => {
    resolve(`
      <h5 class="card-title">Welcome to the Symptom Checker.</h5>
      <div class="card-text">
        <p>This is an  application that mimics doctor's interview and gives you a preliminary diagnosis basing on 
          Infermedica's mathematical model.
        </p>
        <p>
          Please click 
          <span class="badge badge-primary">Next</span> 
          to move to the first question.
        </p>
      </div>
    `);
  });
};

export default template;
