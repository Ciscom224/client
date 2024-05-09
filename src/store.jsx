import { create } from 'zustand';

// Notre store nous permet de gérer les State de notre code, en d'autres terme les State qu'on est censé envoyé aux childrens
// On aura juste a appeler ce store et pas faire des props sur plusieurs composants plusieurs fois

// Pour le changement de menu en fonction du bouton connexion + inscription
const useRemovedMenu = create(set => ({
    isRemoved: false,
    setTrue: () => set({ isRemoved: true }),
    setFalse: () => set({ isRemoved: false })
}));

// C'est ici qu'on récupére si l'utilisateur est connecté ou pas, on fera un axios quand ca sera connecté au backend
const useAuthStore = create((set) => ({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' || false,
    setIsAuthenticated: (value) => {
      set({ isAuthenticated: value });
      localStorage.setItem('isAuthenticated', value ? 'true' : 'false');
    },
  }));

// Ce store permettra de gérer le quiz 
const useQuizStore = create(set => ({
  points: 0,
  theme: "",
  questions : [],
  choices : [],
  answers : [],
  setQuestions: () => set({ questions: ["Qui est le goat ?","Quelle équipe n'est pas qualifié en quart de finale de Champions League ?","Qui est le goat ?","Quelle équipe n'est pas qualifié en quart de finale de Champions League ?","Qui est le goat ?"] }),
  setChoice: () => set({ choices: [["Lionel Messi","Cristiano Ronaldo","Maradonna","Neymar JR"],["PSG","Barcelone","Real Madrid","Liverpool"],["Lionel Messi","Cristiano Ronaldo","Maradonna","Neymar JR"],["PSG","Barcelone","Real Madrid","Liverpool"],["Lionel Messi","Cristiano Ronaldo","Maradonna","Neymar JR"]] }),
  setAnswers: () => set({ answers: [["Lionel Messi","Cristiano Ronaldo"],["Liverpool"],["Lionel Messi","Cristiano Ronaldo"],["Liverpool"],["Lionel Messi","Cristiano Ronaldo"]] }),
  setTheme: (newTheme) => set({ theme: newTheme}),
  setPoints : (newPoints) => set(state => ({ points: state.points + newPoints })),
  resetPoints : () => set({ points: 0 })
}))

export { useRemovedMenu,useAuthStore,useQuizStore };