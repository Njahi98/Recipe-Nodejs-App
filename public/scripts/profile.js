      const profileContainer = document.querySelector('.profile-page-container');
      const profileId = profileContainer.dataset.profileid;
      const profileReviews = document.querySelector('.profile-reviews-container');
      const profileRecipes= document.querySelector('.profile-recipes-container')
      window.addEventListener('load',async(e)=>{
        e.preventDefault();
        //function to show user's reviews
        try {
          const response = await fetch(`/profile/${profileId}/reviewsRecipes`,{
          method:'GET',
          headers:{
            'content-type':'application/json',
          }
        });
        if(response.ok){
          const data = await response.json();
          if(data.userReviews.length >0){            
            const reviews = data.userReviews.map(userReview=>{
              const html = document.createElement('div');
              html.classList.add('review-card')
              html.innerHTML=
               `
                  <div class="reviews-section">
                  <div class="review-user">
                  <a href="/recipes/${userReview.recipe.id}">  <p>Recipe: ${userReview.recipe.title} </p></a>  
                  </div>
                  <div class="review-content">
                      <div class="review-rating">
                          <span class="stars"></span>
                      </div>
                      <p class="review-comment"> ${userReview.reviews[0].comment}</p>
                  </div></div>`;
                  const stars = html.querySelector('.stars')
                  stars.textContent="⭐".repeat(userReview.reviews[0].rating)
                  profileReviews.appendChild(html)

            })
          }else{
            const html = document.createElement('div');
            html.classList.add('no-reviews')
            html.innerHTML=
               `<p>No reviews yet. add your first review  to a recipe!</p>`
                profileReviews.appendChild(html)
          }
          if(data.userRecipes.length >0){            
          const recipes = data.userRecipes.map(userRecipe=>{
            const html = document.createElement('div');
              html.classList.add('review-card')
              html.innerHTML=
               `
                  <div class="reviews-section">
           <img class="profile-recipe-image" src="/recipes/image/${userRecipe.imageId}" alt="Current recipe image" style="max-width: 200px;">
                    
                    <div class="recipe-user">
                    <a href="/recipes/${userRecipe.id}">  <p>Recipe: ${userRecipe.title} </p></a>  
                    </div>
                    <div class="review-content">
                        <p class="review-comment"> ${userRecipe.description}</p>
                    </div>
                </div>`; 
                  profileRecipes.appendChild(html)
          }
        )}else{
          const html = document.createElement('div');
            html.classList.add('no-reviews')
            html.innerHTML=
               `<p>No recipes yet. add your first recipe!</p>`
                profileRecipes.appendChild(html)
        }
        }
 
        } catch (error) {
          showNotification(error,'var(--error-color)');
        }
      })