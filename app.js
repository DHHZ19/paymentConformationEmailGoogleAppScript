function createAndSendConformationEmail() {
    try {
    // Log the subject lines of up to the first 50 emails in your Inbox
      var threads = GmailApp.getInboxThreads(0, 50);
      // loops threads and checks for a subject
      function loopThreads(sub){
        let subject
        let thread
        let sender
        for (var i = 0; i < threads.length; i++) {
          if(threads[i].getFirstMessageSubject() == sub){
            sender = threads[i].getMessages()[0].getFrom()
            subject = threads[i].getFirstMessageSubject()
            thread = threads[i]
          }
        }
        return {subject, thread, sender}
      }
      // loop the threads and take out the one that has a subject of "New appointment"
      let res = []
      function loopThroughAndFindOne(){
        let threadsFifty = []
        for(let i = 0; i < threads.length; i++){
         threadsFifty.push(threads[i].getFirstMessageSubject())
         if(threadsFifty[i].includes('Prime') && threadsFifty[i].includes('Order')){
           res.push(threads[i])
           res.push(threadsFifty[i])
         }
        }
         console.log(res[0])
      }
      loopThroughAndFindOne()
      // this string should not change
      let payment = loopThreads('Charge disputed for Amazon Prime Subscription Order D01-9301231-7696233')
      // check if they both exist
      if(res && payment.subject){
        // Get the email address of the active user - that's you.
      const email = Session.getActiveUser().getEmail();
          // Create a email to show sussecful payment
        GmailApp.sendEmail(email,`Payment completed by client`, `from this person ${payment.sender}`)
        GmailApp.moveThreadToArchive(payment.thread)
        GmailApp.moveThreadToArchive(res[0])
      }
    } catch (err) {
     // TODO (developer) - Handle exception
       Logger.log('Failed with error %s', err.message);
    }
  }