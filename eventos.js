const eventos = {

    ggj: {
        titulo: "Global Game Jam",
        data: "22 a 24 de Janeiro de 2027",
        descricao: "Uma das maiores maratonas de desenvolvimento de jogos do mundo.",

        duracao: "48h",
        modalidade: "Online",
        equipes: "Livre",

        requisitos: [
            "Participação individual ou em equipe",
            "Conhecimento básico de desenvolvimento",
            "Entrega dentro do prazo"
        ],

        cronograma: [
            ["22/01", "Divulgação do tema"],
            ["23/01", "Desenvolvimento dos jogos"],
            ["24/01", "Entrega dos projetos"]
        ],

        premiacao:
            "Certificado de participação e destaque para os melhores projetos."
    },

    ludum: {
        titulo: "Ludum Dare",
        data: "15 a 18 de Março de 2027",
        descricao: "Uma das competições mais tradicionais da comunidade indie.",

        duracao: "72h",
        modalidade: "Online",
        equipes: "Solo",

        requisitos: [
            "Participação individual",
            "Publicação do jogo ao final",
            "Seguir o tema do evento"
        ],

        cronograma: [
            ["15/03", "Anúncio do tema"],
            ["16/03", "Desenvolvimento"],
            ["18/03", "Envio dos projetos"]
        ],

        premiacao:
            "Reconhecimento da comunidade e destaque na plataforma Ludum Dare."
    },

    brackeys: {
        titulo: "Brackeys Game Jam",
        data: "10 a 17 de Abril de 2027",
        descricao: "Game Jam organizada pela comunidade Brackeys.",

        duracao: "7 dias",
        modalidade: "Online",
        equipes: "Livre",

        requisitos: [
            "Participação individual ou em equipe",
            "Projeto criado durante o evento",
            "Respeitar o tema"
        ],

        cronograma: [
            ["10/04", "Início da competição"],
            ["13/04", "Checkpoint da comunidade"],
            ["17/04", "Entrega final"]
        ],

        premiacao:
            "Divulgação dos melhores projetos e certificados."
    },

    gmtk: {
        titulo: "GMTK Game Jam",
        data: "08 a 12 de Julho de 2027",
        descricao: "Evento organizado pelo canal Game Maker's Toolkit.",

        duracao: "96h",
        modalidade: "Online",
        equipes: "Livre",

        requisitos: [
            "Seguir o tema da edição",
            "Projeto original",
            "Publicação ao final do evento"
        ],

        cronograma: [
            ["08/07", "Tema revelado"],
            ["09-11/07", "Desenvolvimento"],
            ["12/07", "Submissão"]
        ],

        premiacao:
            "Destaque internacional e avaliação da comunidade."
    },

    kenney: {
        titulo: "Kenney Jam",
        data: "05 a 07 de Setembro de 2027",
        descricao: "Evento ideal para iniciantes no desenvolvimento de jogos.",

        duracao: "48h",
        modalidade: "Online",
        equipes: "Livre",

        requisitos: [
            "Conhecimentos básicos",
            "Projeto desenvolvido durante a Jam",
            "Entrega no prazo"
        ],

        cronograma: [
            ["05/09", "Abertura"],
            ["06/09", "Desenvolvimento"],
            ["07/09", "Envio dos jogos"]
        ],

        premiacao:
            "Feedback da comunidade e divulgação dos projetos."
    },

    jaaj: {
        titulo: "Game Jaaj",
        data: "20 a 22 de Novembro de 2027",
        descricao: "Evento brasileiro focado em networking e criação de jogos.",

        duracao: "48h",
        modalidade: "Online",
        equipes: "Livre",

        requisitos: [
            "Participação individual ou em equipe",
            "Projeto original",
            "Publicação na plataforma"
        ],

        cronograma: [
            ["20/11", "Anúncio do tema"],
            ["21/11", "Desenvolvimento"],
            ["22/11", "Entrega"]
        ],

        premiacao:
            "Certificados, networking e divulgação dos jogos."
    }

};

const params = new URLSearchParams(window.location.search);
const eventoId = params.get("evento");

const evento = eventos[eventoId];

if (evento) {

    document.getElementById("titulo").textContent = evento.titulo;
    document.getElementById("data").textContent = evento.data;
    document.getElementById("descricao").textContent = evento.descricao;
    document.getElementById("duracao").textContent = evento.duracao;
    document.getElementById("modalidade").textContent = evento.modalidade;
    document.getElementById("equipes").textContent = evento.equipes;
    document.getElementById("premiacao").textContent = evento.premiacao;

    const listaRequisitos = document.getElementById("requisitos");

    evento.requisitos.forEach(requisito => {

        const li = document.createElement("li");
        li.textContent = requisito;

        listaRequisitos.appendChild(li);

    });

    const tabelaCronograma = document.getElementById("cronograma");

    evento.cronograma.forEach(item => {

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${item[0]}</td>
            <td>${item[1]}</td>
        `;

        tabelaCronograma.appendChild(tr);

    });

}