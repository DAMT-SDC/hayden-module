const { Product } = require('./models');
const { connection } = require('./index');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const sequelize = require('sequelize');
const Promise = require('bluebird');
const queue = require('async/queue');

const csvWriter = createCsvWriter({
  path: './database/seedsTwo.csv',
  append: true,
  header: [
    { id: 'name', title: 'NAME' },
    { id: 'count', title: 'COUNT' },
  ]
});


const getDistinct = (value) => {
  return new Promise((resolve, reject) => {
    connection
    .query(`SELECT DISTINCT ${value} FROM products WHERE ${value} IS NOT NULL;`, {
      type: sequelize.QueryTypes.SELECT,
      benchmark: true
    })
    .then(responseArray => {
      resolve(responseArray);
    })
  })
}

const getCount = (value, field) => {
  return new Promise((resolve, reject) => {
    if (value) {  
      if (value.includes('\'')) {
        value = value.slice(0, value.indexOf('\'')) + '\'' + value.slice(value.indexOf('\''));
      }
      connection.query(`SELECT COUNT(${field}) from products WHERE ${field} = '${value}'`, {
        type: sequelize.QueryTypes.SELECT,
        benchmark: true
      })
      .then(array => {
        resolve(array);
      })
    }
  })
}

const csvFormat = (field, obj2) => {
  return new Promise((resolve, reject) => {
    resolve({name : field, count: Number(obj2.count)});
  })
}


const writeToCsv = (field) => {
  const resultsArray = [];
  getDistinct(`${field}`)
  .then(responseArray => {
    let count = 0;
    const q = queue((obj, callback) => {
      getCount(obj[`${field}`], `${field}`)
        .then(array => {
          csvFormat(obj[`${field}`], array[0])
            .then(csvObj => {
              resultsArray.push(csvObj);
              count += 1;
              console.log(count)
              callback();
            })
      })
    }, 10);

    q.push(responseArray, err => {
      if (err) console.error(err);
    })

    q.drain = () => {
      csvWriter.writeRecords(resultsArray)
        .then(() => {
          console.log('csv done writing!')
        })
    }
  })
}

writeToCsv('team')
// const queueArray = [];

// getDistinct(`team`)
// .then(responseArray => {
//   let count = 0;
//   const q = queue((obj, callback) => {
//     getCount(obj[`team`], `team`)
//       .then(array => {
//         csvFormat(obj[`team`], array[0])
//           .then(csvObj => {
//             queueArray.push(csvObj);
//             count += 1;
//             console.log(count)
//             callback();
//           })
//     })
//   }, 10);

//   q.push(responseArray, err => {
//     if (err) console.error(err);
//   })

//   q.drain = () => {
//     console.log(queueArray)
//     csvWriter.writeRecords(queueArray)
//       .then(() => {
//         console.log('csv done writing!')
//       })
//   }
// })



// connection
//   .query(`SELECT DISTINCT name FROM products;`, {
//     type: sequelize.QueryTypes.SELECT,
//     benchmark: true
//   })
//   .then(responseArray => {
//     for (let obj of responseArray.slice(0, 100000)) {
//       connection.query(`SELECT COUNT(name) from products WHERE name = '${obj.name}'`)
//       .then(array => {
//         for (let obj2 of array) {
//           if (obj2.rows) {
//             name.push({name : [obj.name], count: Number(obj2.rows[0].count)});
//           }
//         }
//         return name;
//       })
//       .then(name => {
//         if (name.length === responseArray.length) {
//           csvWriter.writeRecords(name)
//             .then(() => {
//               console.log('names done!');
//             })
//         }
//       })
//     }
//   });

//   connection
//   .query(`SELECT DISTINCT team FROM products;`, {
//     type: sequelize.QueryTypes.SELECT,
//     benchmark: true
//   })
//   .then(responseArray => {
//     for (let obj of responseArray) {
//       if (obj.team) {
//         connection.query(`SELECT COUNT(team) from products WHERE team = '${obj.team}'`)
//         .then(array => {
//           for (let obj2 of array) {
//             if (obj2.rows) {
//               team.push({name : [obj.team], count: Number(obj2.rows[0].count)});
//             }
//           }
//           return team;
//         })
//         .then(team => {
//           if (team.length === responseArray.length) {
//             csvWriter.writeRecords(team)
//               .then(() => {
//                 console.log('teams done!')
//               })
//           }
//         })
//       }
//     }
//   });

//   connection
//   .query(`SELECT DISTINCT sport FROM products;`, {
//     type: sequelize.QueryTypes.SELECT,
//     benchmark: true
//   })
//   .then(responseArray => {
//     for (let obj of responseArray) {
//       if (obj.sport) {
//         connection.query(`SELECT COUNT(sport) from products WHERE sport = '${obj.sport}'`)
//         .then(array => {
//           for (let obj2 of array) {
//             if (obj2.rows) {
//               sport.push({name : [obj.sport], count: Number(obj2.rows[0].count)});
//             }
//           }
//           return sport;
//         })
//         .then(sport => {
//           if (sport.length === responseArray.length) {
//             csvWriter.writeRecords(sport)
//               .then(() => {
//                 console.log('sports done!')
//               })
//           }
//         })
//       }
//     }
//   });

//   connection
//   .query(`SELECT DISTINCT category FROM products;`, {
//     type: sequelize.QueryTypes.SELECT,
//     benchmark: true
//   })
//   .then(responseArray => {
//     for (let obj of responseArray) {
//       connection.query(`SELECT COUNT(category) from products WHERE category = '${obj.category}'`)
//       .then(array => {
//         for (let obj2 of array) {
//           if (obj2.rows) {
//             category.push({name : [obj.category], count: Number(obj2.rows[0].count)});
//           }
//         }
//         return category;
//       })
//       .then(category => {
//         if (category.length === responseArray.length) {
//           csvWriter.writeRecords(category)
//             .then(() => {
//               console.log('categories done!')
//             })
//         }
//       })
//     }
//   });

//   connection
//   .query(`SELECT DISTINCT color FROM products;`, {
//     type: sequelize.QueryTypes.SELECT,
//     benchmark: true
//   })
//   .then(responseArray => {
//     for (let obj of responseArray) {
//       connection.query(`SELECT COUNT(color) from products WHERE color = '${obj.color}'`)
//       .then(array => {
//         for (let obj2 of array) {
//           if (obj2.rows) {
//             color.push({name : [obj.color], count: Number(obj2.rows[0].count)});
//           }
//         }
//         return color;
//       })
//       .then(color => {
//         if (color.length === responseArray.length) {
//           csvWriter.writeRecords(color)
//             .then(() => {
//               console.log('colors done!')
//             })
//         }
//       })
//     }
//   });

// connection
//   .query(`SELECT DISTINCT gender FROM products;`, {
//     type: sequelize.QueryTypes.SELECT,
//     benchmark: true
//   })
//   .then(responseArray => {
//     for (let obj of responseArray) {
//       connection.query(`SELECT COUNT(gender) from products WHERE gender = '${obj.gender}'`)
//       .then(array => {
//         for (let obj2 of array) {
//           if (obj2.rows) {
//             gender.push({name : [obj.gender], count: Number(obj2.rows[0].count)});
//           }
//         }
//         return gender;
//       })
//       .then(gender => {
//         if (gender.length === responseArray.length) {
//           csvWriter.writeRecords(gender)
//             .then(() => {
//               console.log('genders done!')
//             })
//         }
//       })
//     }
//   });

