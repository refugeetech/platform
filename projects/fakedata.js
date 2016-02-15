if(Meteor.isClient) {
  Meteor.startup(function(){
    //USAGE: just use Factory.create('factoryname') in the browser console to add some documents to the database. Would be great to use local Collections instead/as an option.

    //Define your factories here
    Factory.define('project',Projects, {
      isRTProject:false,
      mediaid:"none",
      solution: {
        isTech:function() {
          return faker.random.arrayElement([true,false]);
        },
        description: function() {
          return faker.lorem.sentences();
        }
      },
      name: function() { return faker.name.findName();},
      description: function() {return faker.lorem.sentences();},
      shortDescription: function(){ return faker.lorem.sentence();},
      challengeCategories: function(){ return [faker.random.arrayElement(['social', 'bureaucracy', 'housing', 'education','language', 'employment', 'coordination'])]; },
      tags: function(){ return faker.lorem.words(); },
      startupDate: function() {return faker.date.past();},
      currentStage: function(){ return faker.random.arrayElement([
        'initiation',
        'planning',
        'implementationExecution',
        'operationMonitoring',
        'closing'
      ]);},
      targetPlatforms: ['web'],
      postalAddress: function(){ return {
        city: faker.address.city(),
        country:faker.address.country()
      }},
      links: function() { return [{url:faker.internet.url(),name:faker.lorem.sentence(),type:'web'},{url:faker.internet.url(),name:faker.lorem.sentence(),type:'facebook'},{url:faker.internet.url(),name:faker.lorem.sentence(),type:'twitter'}];},
      dateListed: function() {return faker.date.past();}


    });


  });
}
