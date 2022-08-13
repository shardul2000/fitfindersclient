import background from '../assets/Mathing.png';
import { Widget, addResponseMessage } from 'react-chat-widget';
import { useEffect, useState } from 'react';
import 'react-chat-widget/lib/styles.css';
import {lexClient} from './chatbotconfig'
import { RecognizeTextCommand } from "@aws-sdk/client-lex-runtime-v2";
import { useNavigate } from 'react-router-dom';


  var lexparams = {
      botAliasId: "TSTALIASID",
      botId: "7I7BP40L9U", 
      localeId: "en_US",
      sessionId: "some_session_id1",
      text: '',
  };


export default function Bot(){
    let navigate = useNavigate();
    const[userMessage, setUserMessage] = useState("");
    useEffect(() => {
        addResponseMessage('Welcome to Fitfinders! If you have any questions, feel free to send them here!\n Some starters:\n -Hi\n-What can I do on this app?\n-Find gym buddies');
      }, []);
      

    useEffect(() => {
        const method = async()=>{
            var data = await lexClient.send(new RecognizeTextCommand(lexparams));
            addResponseMessage(data.messages[0].content);
            if(data.messages[0].content=="Great! Redirecting you to the 'gym listings' page"){
              navigate("/gymlistings");
            }
            if(data.messages[0].content=="Great! Redirecting you to find buddies page"){
              navigate("/findbuddy");
            }
        }
        if(userMessage!=""){
            lexparams.text=userMessage;
            method();
        }  
      }, [userMessage]);
 

      const handleNewUserMessage = (newMessage) => {
          setUserMessage(newMessage); 
          console.log(`New message incoming! ${newMessage}`);
      };
    
        return (
            <Widget
              handleNewUserMessage={handleNewUserMessage}
              profileAvatar={background}
              title="FitFinders Bot!"
              subtitle="FAQs"
              senderPlaceHolder = "Type a message here"
            />
        );
}

