// add botUI interface
$(function() {
  var botui = new BotUI('my-botui-app');
  
  // START BOTUI pseudo-discussion
botui.message.add({ // show a message
  human: false,
  content: 'Bonjour !'
}).then(() => {
  return botui.message.bot({ // second one
    delay: 500, // wait 1 sec.
    content: 'Comment puis-je vous aider ?'
  })
}).then(function () { 
      return botui.action.button({ // show 'text' action
      action: [
      {
        text: "J'ai une question !",
        value: "question"
      },
      {
        text: 'Je veux aider / contribuer !',
        value: 'contribute'
      },
      {
        text: 'J\'ai une idée / suggestion !',
        value: 'idea'
      },
      {
        text: 'Je souhaite être tenu informé des nouveautés !',
        value: 'newslettre'
      }]}
  )
}).then(function (res) {// get the result
  console.log(res)
  if (res.value == 'question') {
    botui.action.button({ // show 'text' action
      action: [
      {
        text: "J'ai besoin d'aide pour utiliser le site",
        value: "help"
      },
      {
        text: 'J\'ai une question sur les données utilisées',
        value: 'data'
      },
      {
        text: 'Qui est à l\'origine du site ?',
        value: 'author'
      },
      {
        text: 'J\'ai une autre question',
        value: 'other'
      }]
    }).then(function(res){
      if (res.value == 'help'){
        botui.message.bot({
            delay: 1000,
            content: "C'est très simple !"
        }).then(
        botui.message.bot({
            delay: 1500,
            content: "Je vous affiche la page avec les informations nescessaires !"
        })
        ).then(
        botui.message.bot({
            delay: 2000,
            content: "N'hésitez pas si vous avez d'autre questions à me contacter à info@apiscore.be !"
        })).then(openModal()
        ); // end of 'help question'
      } else if (res.value == 'data') {
        botui.message.bot({
            delay: 500,
            content: "Pas de problème"
        }
        ).then(
        botui.message.bot({
            delay: 1000,
            content: "Pour info, toutes les données utilisées sont en libre accès"
        })
        ).then(
        botui.message.bot({
            delay: 2000,
            content: "Sur quelle données avez vous une question ?"
        })
        ).then(
          function () {
            return botui.action.button({ 
            action: [
            {
              text: "les écotopes",
              value: "ecotopes"
            },
            {
              text: 'les parcelles agricoles',
              value: 'sigec'
            },
            {
              text: 'l\'occupation du sol',
              value: 'walous'
            },
            {
              text: 'les orthophotos (images aériennes)',
              value: 'ortho'
            }]
          })}).then(function(res){
            if (res.value == 'ecotopes') {
              botui.message.bot({
                  content: "La couche a été créée par l'Univerité Catholique de Louvain"
              }).then(
              botui.message.bot({
                  delay: 500,
                  content: 'Vous trouverez plus de détails [ici](https://maps.elie.ucl.ac.be/lifewatch/ecotopes.html)'
              })
              )
            } else if (res.value == 'sigec') {
              botui.message.bot({
                  delay: 1000,
                  content: "Il s'agit des parcelles agricoles basées sur la déclaration des agriculteurs"
              }).then(
              botui.message.bot({
                  delay: 500,
                  content: "La couche actuellement affichée est celle des cultures de 2019"
              })
              ).then(
              botui.message.bot({
                  delay: 500,
                  content: "Dès que la mise à jour de la couche sera disponnible, elle sera intégrée au site !"
              })
              )
            } else if (res.value == 'walous') {
              botui.message.bot({
                  delay: 1000,
                  loading:true,
                  content: "La carte d'occupation du sol a été réalisée sur base des données de 2018"
              }).then(
              botui.message.bot({
                  delay: 1500,
                  content: "Il s'agit d'un projet initié par le SPW et réalisé par l'UCL, ULB et l'ISSEP"
              })
              ).then(
              botui.message.bot({
                  delay: 2000,
                  content: "Plus d'informations sont disponnibles [ici](https://geoportail.wallonie.be/walous)"
              })
              ).then(
              botui.message.bot({
                  delay: 2300,
                  content: "Et le rapport final du projet [ici](https://geoportail.wallonie.be/files/PDF/RA_WALOUS_final_sept20.pdf)"
              })
              )
            } else if (res.value == 'ortho') {
              botui.message.bot({
                  delay: 1000,
                  content: "Il s'agit des images aériennes prises en 2019"
              }).then(
              botui.message.bot({
                  delay: 1500,
                  content: "La couche de 2020 est disponnible mais la saison de prise de vue est moins propice"
              })
              ).then(
              botui.message.bot({
                  delay: 2500,
                  content: "Envoyez moi vos commentaires à info@apiscore.be !"
              })
              )
            }
          }); // end of 'data/layer' questions
      // end of 'data' question
      } else if (res.value == 'author') {
        botui.message.bot({
                  delay: 1000,
                  loading:true,
                  content: "Nicolas Matton est à l'origine de ce site"
              }).then(
              botui.message.bot({
                  delay: 1500,
                  content: "Je suis pour l'instant le seul contributeur,"
              })
              ).then(
              botui.message.bot({
                  delay: 1500,
                  content: "Mais tout aide est la bienvenue !"
              })
              ).then(
              botui.message.bot({
                  delay: 1500,
                  content: "Si besoin, vous pouvez me contacter à info@apiscore.be !"
              })
              ).then(
              botui.message.bot({
                  delay: 1500,
                  content: "Merci pour votre intérêt !"
              })
              )

      } else if (res.value == 'other') {
         botui.message.bot({
                  delay: 1000,
                  loading:true,
                  content: "OK ! quelle est votre question ?"
              }).then(function () {
                return botui.action.text({
                  action: {
                    size: 18,
                    icon: 'question',
                    sub_type: 'text',
                    placeholder: 'Ma question...'
                  }
                })
              }).then((res) => {
                question = res.value; // save new value
                return botui.message
                  .bot({
                    delay: 300,
                    loading: true,
                    content: 'Merci ! Je ne peux pas vous répondre pour l\'instant, mais laissez moi votre email et j\'y répondrai !'
                  })
                }).then(function () {
                return botui.action.text({
                  action: {
                    size: 18,
                    icon: 'envelope-o',
                    sub_type: 'email',
                    placeholder: 'Entrez votre email'
                  }
                })
              }).then((res) => {
                question = res.value; // save new value
                return botui.message.bot({
                    delay: 300,
                    loading: true,
                    content: 'Merci ! Je vais tentez d\'y répondre au plus vite !'
                  })
                })
      }
    });
  } else if (res.value == 'contribute') {
    botui.message.bot({
            delay: 1000,
            loading:true,
            content: "Merci d'avance !"
    }).then(
            botui.message.bot({
              delay: 1500,
              content: "Vous pouvez !(github) [améliorer le site](https://github.com/nmatton/apiscore) sur github, m'offrir !(coffee) [un verre](http://paypal.com), suggérer une !(lightbulb-o) [idée] ou encore en parler autour de vous :)"
              })
            );
  } else if (res.value == 'idea') {
    botui.message.bot({
            delay: 1000,
            loading:true,
            content: "Super, je suis preneur de toute les idées et suggestion !"
    }).then(
      botui.message.bot({
        delay: 1500,
        content: "Les idées déja recues sont listées à cette addresse: https://trello.com/b/rGPIJJiQ/apiscore"
        })
    ).then(
      botui.message.bot({
        delay: 1500,
        content: "Le tableau des idées et améliorations est régulièrement mis jour ;)"
        })
    ).then(
    botui.message.bot({
      delay: 1500,
      content: "Vous pouvez remplir le formulaire disponnible [ici] pour en ajouter"
      })
    );
  } else if (res.value == 'newslettre') {
    botui.message.bot({
            delay: 1000,
            loading:true,
            content: "Ok, pas de problème !"
    }).then(function () {
      return botui.action.text({
        action: {
          size: 18,
          icon: 'envelope-o',
          sub_type: 'email',
          placeholder: 'Entrez votre email'
        }
      })
    }).then((res) => {
      question = res.value; // save new value
      return botui.message.bot({
          delay: 300,
          loading: true,
          content: 'Merci ! Vous serez tenus informés de la suite !'
        })
      })
  };

  
});
  // END OF BOTUI pseudo-discussion

  $("#chat-circle").click(function() {    
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  });
  
  $(".chat-box-toggle").click(function() {
    $("#chat-circle").toggle('scale');
    $(".chat-box").toggle('scale');
  });
  
});
