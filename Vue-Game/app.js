new Vue({
    el: '#app',
    data:{
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods:{
        startGame(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function () {
            let damage = this.calculateDamage(3, 10) ;

            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hist Monster for ' + damage
            });
            if(this.checkWin()){
                return;
            }
            this.monsterAttacks();
        },
        specialAttack(){
            let damage = this.calculateDamage(10, 20) ;
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hist Monster hard for ' + damage
            });
            if(this.checkWin()){
                return;
            }
            this.monsterAttacks();

        },
        heal(){
            if(this.playerHealth <= 90){
                this.playerHealth += 10;
            }else{
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            });
            this.monsterAttacks();

        },
        giveUp(){
            this.gameIsRunning = false;

        },
        monsterAttacks(){
            let damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hist Player for ' + damage
            });
            this.checkWin();
        },
        calculateDamage(min, max){
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin(){
            if (this.monsterHealth <= 0) {
                if(confirm('You won! New Game?')){
                    this.startGame();
                } else{
                    this.gameIsRunning = false;
                }
                return true;
            }else if(this.playerHealth <= 0){
                if(confirm('You won! New Game?')){
                    this.startGame();
                } else{
                    this.gameIsRunning = false;
                }
                return false;
            }
        }

    }
});