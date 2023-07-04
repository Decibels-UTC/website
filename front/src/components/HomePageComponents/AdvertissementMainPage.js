import {Message} from 'semantic-ui-react'


function MessageMainPage(){

    return(<>

        <Message style={{width:"80%", marginLeft:"4%", marginRight:"4%", marginTop:"2%"}}
        color='red'
        header='Bienvenue sur le site de Décibels'
        list={[
          'Message Acceuil', "Sur ce site : plein de trucs cools",]}
        /></>
    )
}
export default MessageMainPage