import inquirer from "inquirer";
const APIlink = "https://opentdb.com/api.php?amount=6&category=21&difficulty=easy&type=multiple";
let fetchdata = async (data) => {
    let fetchquiz = await fetch(data);
    let res = await fetchquiz.json();
    return res.result;
};
let data = await fetchdata(APIlink);
let startQuiz = async () => {
    let score = 0;
    // for user name
    let name = await inquirer.prompt({
        type: "input",
        name: "fname",
        message: "what is your name"
    });
    for (let i = 1; i <= 5; i++) {
        let answers = [data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt({
            type: "list",
            name: "Quiz",
            message: data[i].question,
            choices: answers.map((val) => val)
        });
        if (ans.Quiz == data[i].correct_answer) {
            ++score;
        }
    }
    console.log(`Dear${name.fname} your score is  ${score} out of ${5}`);
};
startQuiz();
