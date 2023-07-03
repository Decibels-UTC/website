import { Card } from 'semantic-ui-react'

function CardContact(props){


    return(
        <>

            <Card
                className={"cardcontact"}
            link={props.link}
            header={props.name}
                meta={props.meta}
                description={props.description}
            />

        </>

    );

}

export default CardContact;