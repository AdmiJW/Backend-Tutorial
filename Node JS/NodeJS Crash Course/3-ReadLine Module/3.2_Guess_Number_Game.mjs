
import readline from 'readline';


//  Function to return a Promise wrapper for the obtaining User Input
function userInputPromise(prompt, inter) {
    return new Promise((resolve)=> {
        inter.question(prompt, (input)=> resolve(input) );
    });
}


async function guessNumberGame() {
    const inter = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    const n1 = Math.floor( Math.random() * 10 + 1 );        //  Between 1 to 10
    inter.write('📢 Guess a Number Between 1 to 10! 📢\n');


    while (true) {
        const input = await userInputPromise('😉😉 Your Guess: ', inter);

        if (input && Number(input) === n1) {
            inter.write("🎊 Congratulations! Correct Answer! 🎊\n");
            break;
        }
        else
            inter.write("❌ Oops! Wrong Guess. Try Again ❌\n");
    }

    inter.close();
}



guessNumberGame();