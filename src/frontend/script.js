
$(document).ready(() => {
    personagem.list();
});

var personagem = {

    list() {
        $.ajax({
            url: 'http://127.0.0.1:1234/readPersonagem',
            type: 'GET',
            success: data => {
                var HP = '';
                var Name = '';
                var Money = '';
                var Tormento = '';
                data.forEach(element => {
                    Name = `${element.NomePersonagem}`;
                    Money = `$${element.Dinheiro}`;
                    HP += `PV: ${element.HP}/${element.MaxHP}`;
                    Tormento = `${element.Tormento}`;
                });
                $('#HeroName').append(Name);
                $('#HeroMoney').append(Money);
                $('#HeroHitPoints').append(HP);
                $('#HeroTorment').append(Tormento);
                $('#docTitle').html(Name);
            }
        });

        $.ajax({
            url: 'http://127.0.0.1:1234/readSkill',
            type: 'GET',
            success: data => {
                var skill = '';
                data.forEach(element => {
                    skill += `<div class="col-6 titulo habilidade"> ${element.NomeHabilidade} <br /> <p class="descrição"> ${element.Efeito_1} <br/> ${element.Efeito_2} <br/> ${element.Efeito_3} </p> </div>`
                });
                $('#HeroSkill').append(skill);
            }
        });
    }

};