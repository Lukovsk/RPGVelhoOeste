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

        $.ajax({
            url: 'http://127.0.0.1:1234/readAtributo',
            type: 'GET',
            success: data => {
                var forca = '';
                var agilidade = '';
                var intelecto = '';
                var coragem = '';
                data.forEach(element => {
                    forca = `${element.Forca}`;
                    agilidade = `${element.Agilidade}`;
                    intelecto = `${element.Intelecto}`;
                    coragem = `${element.Coragem}`;
                });
                $('#valorForca').append(forca);
                $('#valorAgilidade').append(agilidade);
                $('#valorIntelecto').append(intelecto);
                $('#valorCoragem').append(coragem);
            }
        });

        $.ajax({
            url: 'http://127.0.0.1:1234/readAntecedente',
            type: 'GET',
            success: data => {
                var Combate = '';
                var Montaria = '';
                var Negocios = '';
                var Roubo = '';
                var Labuta = '';
                var Medicina = '';
                var Exploracao = '';
                var Tradicao = '';
                data.forEach(element => {
                    Combate = `${element.Combate}`
                    Montaria = `${element.Montaria}`
                    Negocios = `${element.Negocios}`
                    Roubo = `${element.Roubo}`
                    Labuta = `${element.Labuta}`
                    Medicina = `${element.Medicina}`
                    Tradicao = `${element.Tradicao}`
                    Exploracao = `${element.Exploracao}`
                });
                $('#valorCombate').append(Combate);
                $('#valorMontaria').append(Montaria);
                $('#valorNegocios').append(Negocios);
                $('#valorRoubo').append(Roubo);
                $('#valorLabuta').append(Labuta);
                $('#valorMedicina').append(Medicina);
                $('#valorExploracao').append(Exploracao);
                $('#valorTradicao').append(Tradicao);
            }
        });

        $.ajax({
            url: 'http://127.0.0.1:1234/readEquipamento',
            type: 'GET',
            success: data => {
                var tr = '';
                data.forEach(element => {
                    tr += `<tr>`;
                    tr += `<th scope="row"> ${element.NomeEquipamento} </th>`;
                    tr += `<th scope="row"> ${element.DescricaoEquipamento} </th>`;
                    tr += `<th scope="row"> ${element.ObservacaoEquipamento} </th>`;
                    tr += `</tr>`;
                });
                $('#main').html(tr);
            }
        });
    },

    updateInfo() {

        $.ajax({

        })
    }
};

/*
update(userId, oldTitle) {

    var title = prompt('Digite o novo nome:', oldTitle);
    if (title) {
        if (title.trim() != '') {
            $.ajax({
                type: 'POST',
                url: api + '/userupdate',
                data: {title: title, userId: userId},
            }).done(function () {
                users.list();
            }).fail(function (msg) {
                //console.log('FAIL');
            }).always(function (msg) {
                //console.log('ALWAYS');
            });
        }
    }
}, */