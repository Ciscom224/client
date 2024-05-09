export const isEmpty=(value)=>{
    
    return (
        value=== undefined ||
        value === null ||
        (typeof value==="object" && Object.keys(value).length === 0) || 
        (typeof value === "string" && value.trim().length===0)

    )
}
// Cette fonction permet de trier les users et les classent en fonction de la categorie et renvoie la users(surName , profilImage,score)
export const getUsersByScore = (users, categorieName) => {
    try {
        // Filtrer les utilisateurs qui ont des scores
        users = users.filter(user => user.score && user.score.length > 0);

        // Filtrer les utilisateurs ayant la catégorie spécifiée
        const usersScores = users.map(user => {
            const score = user.score.find(score => score.categorieName === categorieName);
            return {
                surName: user.surName,
                profilImage: user.profilImage,
                score: score ? score.level : 0 // Retourne le niveau du score correspondant à la catégorie ou 0 si non trouvé
            };
        });

        // Trier les utilisateurs en fonction des scores maximaux pour la catégorie spécifiée
        usersScores.sort((a, b) => b.score - a.score); // Tri décroissant par score

        return usersScores;
    } catch (error) {
        console.error(error);
        throw error;
    }
}





