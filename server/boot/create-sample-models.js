// Copyright IBM Corp. 2014,2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var async = require('async');

module.exports = function(app) {
  // data sources
  var mongoDs = app.dataSources.mongoDs;
  var mysqlDs = app.dataSources.mysqlDs;

  // create all models
  async.parallel({
    reviewers: async.apply(createReviewers),
    coffeeShops: async.apply(createCoffeeShops)
  }, function(err, results) {
    if (err) throw err;

    createReviews(results.reviewers, results.coffeeShops, function(err) {
      if (err) throw err;
      console.log('> models created successfully');
    });
  });

  // create reviewers
  function createReviewers(cb) {
    mongoDs.automigrate('Reviewer', function(err) {
      if (err) return cb(err);

      app.models.Reviewer.create([
        {email: 'foo@bar.com', password: 'foobar'},
        {email: 'john@doe.com', password: 'johndoe'},
        {email: 'jane@doe.com', password: 'janedoe'}
      ], cb);
    });
  }

  // create coffee shops
  function createCoffeeShops(cb) {
    mongoDs.automigrate('CoffeeShop', function(err) {
      if (err) return cb(err);

      app.models.CoffeeShop.create([
        {name: 'Personal Line Quoting', city: 'Toronto'},
        {name: 'Personal Line Services', city: 'Toronto'},
        {name: 'MyAviva - UK - Application', city: 'Toronto'},
        {name: 'MyAviva - UK - UMT', city: 'Toronto'},
        {name: 'MyAviva - UK - eSecurity', city: 'Toronto'},
        {name: 'MyAviva - CA - Customer MDM Services', city: 'Toronto'},
        {name: 'MyAviva - CA - Customer Management Service', city: 'Toronto'},
        {name: 'MyAviva - CA - Policy  Management Service', city: 'Toronto'},
        {name: 'MyAviva - CA - Service Interface', city: 'Toronto'},
        {name: 'MyAviva - CA - Self Service', city: 'Toronto'},
        {name: 'Marketing Tools - Analytics & Reporting', city: 'Toronto'},
        {name: 'Marketing Tools - Campaign', city: 'Toronto'},
        {name: 'Marketing Tools - CMS', city: 'Toronto'},
        {name: 'Marketing Tools - Social', city: 'Toronto'},
        {name: 'Marketing Tools - Target', city: 'Toronto'},
        {name: 'Aviva Community Fund', city: 'Toronto'},
        {name: 'Aviva Drive', city: 'Toronto'},
        {name: 'Home Checker', city: 'Toronto'},
        {name: 'Rating and Reviews', city: 'Toronto'},
        {name: 'Commercial Lines Quoting & Services', city: 'Toronto'},
        {name: 'AASP', city: 'Toronto'},
        {name: 'Surety Quoting & Services', city: 'Toronto'},
        {name: 'Bank Service', city: 'Toronto'},
        {name: 'Broker Portal - Quoting & Service', city: 'Toronto'},
        {name: 'Broker Management - ABC', city: 'Toronto'},
        {name: 'Elite Quoting & Services', city: 'Toronto'},
        {name: 'MDM', city: 'Toronto'},
        {name: 'Special - Sites', city: 'Toronto'},
        {name: 'Aviva.ca - Partner Websites', city: 'Toronto'},
        {name: 'Aviva.ca - Brand & Marketing Websites', city: 'Toronto'},
        {name: 'Micro-sites - Corporate Websites', city: 'Toronto'},
        {name: 'Micro-sites - CSR Websites', city: 'Toronto'},
        {name: 'Micro-sites - E-Commerce Websites', city: 'Toronto'},
        {name: 'Group Direct Microsites', city: 'Toronto'}
      ], cb);
    });
  }

  // create reviews
  function createReviews(reviewers, coffeeShops, cb) {
    mongoDs.automigrate('Review', function(err) {
      if (err) return cb(err);

      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;

      app.models.Review.create([
        {
          date: Date.now() - (DAY_IN_MILLISECONDS * 4),
          rating: 4,
          comments: 'Return in investment was average.',
          publisherId: reviewers[0].id,
          coffeeShopId: coffeeShops[0].id
        },
        {
          date: Date.now() - (DAY_IN_MILLISECONDS * 3),
          rating: 5,
          comments: 'Quite pleasant.',
          publisherId: reviewers[1].id,
          coffeeShopId: coffeeShops[1].id
        },
        {
          date: Date.now() - (DAY_IN_MILLISECONDS * 2),
          rating: 4,
          comments: 'It was ok.',
          publisherId: reviewers[1].id,
          coffeeShopId: coffeeShops[2].id
        },
        {
          date: Date.now() - (DAY_IN_MILLISECONDS),
          rating: 2,
          comments: 'Could be done better.',
          publisherId: reviewers[2].id,
          coffeeShopId: coffeeShops[4].id
        },
        {
          date: Date.now() - (DAY_IN_MILLISECONDS),
          rating: 4,
          comments: 'I am not impressed',
          publisherId: reviewers[0].id,
          coffeeShopId: coffeeShops[5].id
        },
        {
          date: Date.now() - (DAY_IN_MILLISECONDS),
          rating: 1,
          comments: 'Response time was very low.',
          publisherId: reviewers[1].id,
          coffeeShopId: coffeeShops[6].id
        },
        {
          date: Date.now() - (DAY_IN_MILLISECONDS),
          rating: 5,
          comments: 'High performance.',
          publisherId: reviewers[2].id,
          coffeeShopId: coffeeShops[7].id
        }
      ], cb);
    });
  }
};
