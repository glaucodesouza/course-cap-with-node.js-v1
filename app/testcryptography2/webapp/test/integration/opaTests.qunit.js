sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'testcryptography2/test/integration/FirstJourney',
		'testcryptography2/test/integration/pages/BooksList',
		'testcryptography2/test/integration/pages/BooksObjectPage'
    ],
    function(JourneyRunner, opaJourney, BooksList, BooksObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('testcryptography2') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheBooksList: BooksList,
					onTheBooksObjectPage: BooksObjectPage
                }
            },
            opaJourney.run
        );
    }
);