if(Meteor.isClient) {
    Meteor.startup(function(){
        //Define your factories here
        Factory.define('project',Projects, {
            name: function() { return faker.name.findName();},
            description: function() {return faker.lorem.sentences();},
            shortDescription: function(){ return faker.lorem.sentence();},
            problemCategories: function(){ return [faker.random.arrayElement(['social', 'bureaucracy', 'housing', 'education','language', 'employment', 'coordination'])]; },
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

