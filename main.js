
$.ajax({
  url: "https://swapi.co/api/people",
  success: function (data) {
    let heroesList = [...data.results];

    heroesList.forEach((hero) => {
      let card = document.createElement('div');
      card.classList.add('card')

      let heroNamePlace = document.createElement('h3');
      heroNamePlace.textContent = hero.name;
      card.appendChild(heroNamePlace);

      let heroGenderPlace = document.createElement('p');
      heroGenderPlace.classList.add('heroGender')
      heroGenderPlace.textContent = hero.gender;
      card.appendChild(heroGenderPlace);

      if (hero.homeworld) {
        $.ajax({
          url: hero.homeworld,
          success: function (data) {
            let planet = data.name;
            let heroHomeworld = document.createElement('p');
            heroHomeworld.classList.add('heroHomeworld');
            heroHomeworld.textContent = planet;
            card.appendChild(heroHomeworld);
          }
        })
      }
      if (hero.starships) {
        let starshipsShowButton = document.createElement('button');
        starshipsShowButton.textContent = 'Show starships';
        card.appendChild(starshipsShowButton);
        starshipsShowButton.addEventListener('click', function () {
          card.removeChild(starshipsShowButton);
          let starshipsList = document.createElement('ul')
          hero.starships.forEach((starship) => {
            $.ajax({
              url: starship,
              success: function (data) {
                let starshipName = data.name;
                let starshipitem = document.createElement('li');
                starshipitem.textContent = starshipName;
                starshipsList.appendChild(starshipitem);
              }
            })
          })

        })
      }


      $('#root').append(card);
    })
    console.log(data.results);

  }
});


