
$.ajax({
  url: "https://swapi.co/api/people",
  success: function (data) {
    let heroesList = [...data.results];

    heroesList.forEach((hero, index) => {
      let card = document.createElement('div');
      card.classList.add('card')
      let heroNamePlace = document.createElement('h3');
      heroNamePlace.textContent = hero.name;
      card.appendChild(heroNamePlace);
      card.dataset.index = index;
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
      if (hero.starships.length !== 0) {
        console.log(hero.name, hero.starships);
        let starshipsShowButton = document.createElement('button');
        starshipsShowButton.textContent = 'Show starships';
        card.appendChild(starshipsShowButton);
        starshipsShowButton.addEventListener('click', function (e) {
          let target = +e.target.parentNode.dataset.index;
          card.removeChild(starshipsShowButton);
          let starshipsPlaceHolder = document.createElement('h3');
          starshipsPlaceHolder.textContent = 'Piloted starships: ';
          let starshipsList = document.createElement('ul')
          hero.starships.forEach((starship) => {
            $.ajax({
              url: starship,
              success: function (data) {
                let starshipName = data.name;
                let starshipItem = document.createElement('li');
                let starshipItemLink = document.createElement('a');

                starshipItemLink.textContent = starshipName;
                starshipItem.appendChild(starshipItemLink);
                starshipsList.appendChild(starshipItem);
              }
            })
          })
          starshipsPlaceHolder.appendChild(starshipsList);
          card.appendChild(starshipsPlaceHolder);
        })
      }


      $('#root').append(card);
    })
    console.log(data.results);

  }
});


