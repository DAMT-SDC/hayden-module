module.exports = {
  suggestionQuery: () => `SELECT NameMatch, TeamMatch, SportMatch, CategoryMatch, ColorMatch, GenderMatch FROM (
    SELECT name,
       CASE
         WHEN name ILIKE '%'?'%' THEN name
        END AS NameMatch,
  
        team,
         CASE
         WHEN team ILIKE '%'?'%' THEN team
        END AS TeamMatch,
  
        sport,
          CASE
          WHEN sport ILIKE '%'?'%' THEN sport
        END AS SportMatch,
  
        category,
          CASE
          WHEN category ILIKE '%'?'%' THEN category
        END AS CategoryMatch,
  
        color,
          CASE
          WHEN color ILIKE '%'?'%' THEN color
        END AS ColorMatch,
  
       gender,
       CASE
         WHEN gender ILIKE '%'?'%' THEN gender
       END AS GenderMatch
  
      FROM products AS T
  ) AS T WHERE NameMatch IS NOT NULL OR TeamMatch IS NOT NULL OR SportMatch IS NOT NULL OR CategoryMatch IS NOT NULL OR ColorMatch IS NOT NULL OR GenderMatch IS NOT NULL LIMIT 100;`
}


