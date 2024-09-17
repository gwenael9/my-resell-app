<template>
    <div class="flex justify-between items-center h-20 border-b px-4">
        <h1 class="font-semibold text-xl uppercase">
            <router-link to="/">
                Titre
            </router-link>
        </h1>
      <div>
        <nav>
          <ul class="flex gap-2 items-center uppercase text-sm">
            <li>
              <router-link to="/articles">
                Articles
              </router-link>
            </li>
            <li>
              <router-link to="/ajouter">
                Ajouter
              </router-link>
            </li>
            <li>
              <router-link to="/panier">
                Mon panier
              </router-link>
            </li>
          </ul>
        </nav>
      </div>  
    </div>
</template>
 
<script>
    export default {
        name: 'monHeader'
    }
</script>