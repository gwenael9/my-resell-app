<template>
    <div class="flex justify-between items-center h-20 border-b px-4 uppercase">
        <h1 class="font-semibold text-xl">
            <router-link to="/">Accueil</router-link>
        </h1>
      <div>
        <nav class="hidden sm:block">
          <ul class="flex gap-4 items-center text-sm">
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
        <button class="sm:hidden">
          <Bars3Icon class="w-8" />
        </button>
      </div>  
    </div>
</template>
 
<script>
import { Bars3Icon } from "@heroicons/vue/24/outline"
    export default {
        name: 'monHeader',
        components: {
          Bars3Icon
        }
    }
</script>