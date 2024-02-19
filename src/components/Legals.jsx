import item1 from "../ressources/item1.png";
import item2 from "../ressources/item2.png";
import { motion } from "framer-motion"
import '../style/Legals.css'


function Legals(){
    return(
        <>
            <div className={"main-content-legals"} >


            <h1 className={"title legals-title"}>Mentions légales</h1>

            <section className={"container text-legals"}>
                <h1>Politique de confidentialité</h1>
                <article>
                    <br/>
                    <h2 className={"second-title-legals"}>I - Informations légales</h2>
                    <p>Le site internet dbs.etu-utc.fr appartient à PAE - Decibels (ci-après dénommée «dBs»), comission
                        de l'association loi 1901 PAE-UTC (Pôle Artistique et Evénementiel de l'Université de
                        Technologie de Compiègne) immatriculé au numéro de siret 53236661400016.</p>
                    <p>Siège social (PAE-UTC) : UTC - Centre Benjamin Franklin, MDE, PAE-UTC, Rue Roger Couttolenc 60200
                        Compiègne</p>
                    <p>Les activités de la commission dBs sont soumis à l'approbation du PAE-UTC.</p>
                    <p >Editeur</p>
                    <p>Responsables de publication : Carmen François & Adrien Hervé</p>
                    <p>Contact données personnelles : decibels@assos.utc.fr</p>
                    <p >Réalisation du site et maintenance</p>
                    <p>PAE-Decibels <br/>
                        UTC - Centre Benjamin Franklin, MDE, Rue Roger Couttolenc 60200 Compiègne<br/>
                        decibels@assos.utc.fr
                    </p>
                    <p>Hébergement</p>
                    <p>Adresse : 11, rue de la 8e division, 60200 Compiègne</p>
                </article>
                <br/>
                <br/>
                <article>
                    <h2 className={"second-title-legals"}>II - Définitions</h2>
                    <p>Utilisateur : toute personne qui utilise le site de dBs.<br/><br/>CGU : Conditions générales
                        d’utilisation<br/><br/>
                        Donnée à caractère personnel / Donnée personnelle : toute information se rapportant à une
                        personne physique identifiée ou identifiable. Est réputée être une « personne physique
                        identifiable » une personne physique qui peut être identifiée, directement ou indirectement,
                        notamment par référence à un identifiant, tel qu’un nom, un numéro d’identification, des données
                        de localisation, un identifiant en ligne, ou à un ou plusieurs éléments spécifiques propres à
                        son identité physique, physiologique, génétique, psychique, économique, culturelle ou sociale
                        (art 4.1 RGPD)<br/><br/>
                        Traitement de données : Toute opération ou tout ensemble d’opérations effectuées ou non à l’aide
                        de procédés automatisés et appliquées à des données ou des ensembles de données à caractère
                        personnel, telles que la collecte, l’enregistrement, l’organisation, la structuration, la
                        conservation, l’adaptation ou la modification, l’extraction, la consultation, l’utilisation, la
                        communication par transmission, la diffusion ou toute autre forme de mise à disposition, le
                        rapprochement ou l’interconnexion, la limitation, l’effacement ou la destruction. (art 4.2 RGPD)<br/><br/>
                        Responsable de traitement : La personne physique ou morale, l’autorité publique, le service ou
                        un autre organisme qui, seul ou conjointement avec d’autres, détermine les finalités et les
                        moyens du traitement. (art 4.7 RGPD)</p>
                </article>
                <br/>
                <br/>
                <article>
                    <h2 className={"second-title-legals"}>III - Objet des présentes CGU</h2>
                    <p>Les présentes Conditions Générales ont pour objet de définir les conditions d’utilisation et de
                        mise à disposition du site et ses services pour l’Utilisateur (ci-après désignées les « CGU»).
                        Tout accès et/ou utilisation du site de dBs suppose l’acceptation des termes des présentes
                        CGU.</p>

                    <p>L’utilisateur du site internet reconnaît avoir pris connaissance des présentes CGU et s’engage à
                        les respecter sans réserve. La navigation sur le site vaut acceptation des présentes CGU.</p>

                    <p>L’utilisateur accédant au Site doit faire un usage adéquat des services et des contenus dans le
                        respect des principes de bonne foi et des lois en vigueur.</p>

                    <p>Dans le cas où l’Utilisateur ne souhaite pas accepter tout ou partie des présentes CGU, il lui
                        est demandé de renoncer à tout usage du site et des services.</p>

                    <p>Les CGU sont rédigées, ainsi que l’ensemble des informations mentionnées sur le site, en langue
                        française.</p>
                    <p>Les CGU sont mises à la disposition des utilisateurs sur le Site où elles sont directement
                        consultables.</p>
                    <p>dBs se réserve le droit de modifier à tout moment et sans préavis les CGU, l’utilisateur est donc
                        invité à les consulter régulièrement.</p>
                </article>
                <br/>
                <br/>
                <article>
                    <h2 className={"second-title-legals"}>IV - Données à caractère personnel</h2>
                    <p>dBs met à disposition des utilisateurs sa Politique de Confidentialité.</p>

                    <p>D’une façon générale, l’utilisateur peut visiter le site internet de dBs sans avoir à décliner
                        son identité ni à fournir des informations personnelles le concernant.</p>

                    <p>Cependant, dBs peut dans certains cas demander à l’utilisateur des informations. Ces cas sont
                        listés ci-dessous.</p>

                    <p>Collecte de données personnelles, finalités, base légale et destinataires.</p>

                    <p>dBs, en qualité de responsable de traitement, peut collecter des données à caractère personnel
                        via son site internet et mettre en œuvre des traitements automatisés de ces données.</p>


                    <p>Cookies</p>

                    <p>Voir rubrique spécifique.</p>
                    <p>Engagement de dBs</p>
                    <p>La commission PAE-Decibels informe l’utilisateur qu’elle respecte les réglementations en vigueur
                        en matière de protection des données, et notamment les dispositions du règlement (UE) n°2016/679
                        et de la loi 78-17 du 6 janvier 1978 modifiée relative à l’informatique, aux fichiers et aux
                        libertés. La Politique de Confidentialité de dBs est tenue à disposition sur son site web.</p>

                    <p>dBs s’engage à traiter de façon confidentielle les données concernant l’utilisateur en prenant
                        les mesures de sécurité d’ordre technique et organisationnel qui sont nécessaires pour garantir
                        la protection des données à caractère personnel et pour en éviter l’altération, la perte, le
                        traitement et/ou l’accès non autorisé, compte tenu de l’état de la technologie, de la nature des
                        données stockées et des risques auxquels celles-ci sont soumises.</p>

                    <p>En aucun cas dBs ne vend à des tiers les données personnelles de ses utilisateurs.</p>

                    <p>dBs n’effectue aucun traitement aboutissant à une prise de décision entièrement automatisée sur
                        la base de vos données personnelles.</p>

                    <p>Le traitement des données de l’utilisateur est réalisé en France, si dBs était amené à transférer
                        des données en dehors de l’union européenne, les présentes CGU seraient modifiées.</p>

                    <p>Enfin, si, malgré les mesures mises en place, dBs constate une violation des données de
                        l’utilisateur, dBs s’engage à prendre toutes les dispositions possibles pour limiter l’impact
                        potentiel pour l’utilisateur. Conformément à la règlementation, lorsque les risques pour les
                        droits et libertés de l’utilisateur sont élevés, dBs en informera, dans les meilleurs délais, la
                        CNIL et le cas échéant l’utilisateur.</p>

                    <p>Exercice des droits en matière de données personnelles</p>
                    <p>Conformément aux réglementations en vigueur en matière de protection des données, et notamment
                        aux dispositions du règlement (UE) n°2016/679 et de la loi 78-17 du 6 janvier 1978 modifiée
                        relatives à l’informatique, aux fichiers et aux libertés, l’utilisateur dispose d’un droit
                        d’information, d’accès, de rectification, de limitation ou d’effacement des informations le
                        concernant et peut s’opposer au traitement de ses données personnelles dans les conditions
                        prévues par le RGPD.</p>

                    <p>L’utilisateur peut exercer ces droits en adressant une demande par email à :
                        decibels@assos.utc.fr</p>

                    <p>Si l’utilisateur n’est pas satisfait du traitement de sa demande d’exercice de droits en matière
                        de données personnelles, il lui est possible de déposer une réclamation auprès de la CNIL.</p>
                </article>
                <br/>
                <br/>
                <article>
                    <h2 className={"second-title-legals"}>V - Cookies</h2>
                    <p>L’utilisateur est informé qu’un ou plusieurs cookies, pourront être déposés sur son navigateur
                        lors de sa visite sur le site internet de dBs.</p>

                    <p>dBs souhaite donc informer l’utilisateur de ce qu’est un cookie, du type de cookies qu’elle
                        utilise sur son site, et comment l’utilisateur peut les gérer en fonction de leurs
                        finalités.</p>

                    <p>Qu’est-ce qu’un cookie ?</p>

                    <p>Les cookies sont de petits fichiers, constitués d’une suite d’informations, que certaines
                        plateformes, comme les sites web, peuvent installer sur les équipements des utilisateurs, via
                        leur navigateur. Ils permettent notamment de stocker des préférences de navigation, de collecter
                        des informations statistiques, de permettre certaines fonctionnalités techniques, etc. Les
                        cookies sont parfois utilisés pour stocker des informations de base sur les habitudes de
                        navigation de l’utilisateur ou de son appareil, voire pour le reconnaître notamment lorsqu’une
                        authentification est requise. </p>

                    <p>Les cookies sont également utilisés pour gérer la session de l’utilisateur, par exemple pour
                        adapter le contenu d’un site internet aux préférences des utilisateurs.</p>

                    <p>Quels types de cookies le site internet de dBs utilise-t-il et à quelles fins ?</p>

                    <p>Cookies fonctionnels</p>
                    <p>Ces cookies sont indispensables pour le fonctionnement du site notamment pour éviter la surcharge
                        du site. Ils permettent de conserver, le cas échéant, la date de recueil du consentement de
                        l’utilisateur au dépôt des cookies d’audience et de statistiques.</p>

                    <p>L’utilisateur peut toutefois modifier la configuration de son navigateur de façon à rejeter les
                        cookies.</p>

                    <p>Cookies fonctionnels utilisés sur le site de dBs : Google Webfonts. Il permet le stockage des
                        polices de caractères en cache du navigateur pendant 1 an. Une analyse statistique du nombre de
                        téléchargements est réalisée par Google pour évaluer la popularité de ces polices de caractères
                        (expiration : 12 mois)</p>
                </article>
                <br/>
                <br/>
                <article>
                    <h2 className={"second-title-legals"}>VI - Propriété intellectuelle</h2>
                    <p>Les contenus de ce site (structure, design, texte, image, animation, logo, logiciel…) sont la
                        propriété exclusive de la commission PAE-Décibels. Toute reproduction totale ou partielle de ce
                        site sans l’autorisation préalable, écrite et expresse de la commission PAE-Décibels est
                        interdite et constituerait une contrefaçon sanctionnée par le Code de la propriété
                        intellectuelle (articles L. 335-2 et suivants ainsi que l’article L713-2).
                        Pour demander l’autorisation d’utiliser tout type d’information relative à un contenu paru sur
                        le site internet de dBs, l’utilisateur est invité à en faire la demande à :
                        decibels@assos.utc.fr
                        Les photos utilisées sur ce site sont sous licence d’utilisation. Toute utilisation par
                        l’utilisateur sans autorisation engage la responsabilité de l’utilisateur.</p>
                </article>
                <br/>
                <br/>
                <article>
                    <h2 className={"second-title-legals"}>VII - Limitation de responsabilité</h2>
                    <p>dBs met tout en œuvre pour offrir aux utilisateurs des informations et/ou outils disponibles et
                        vérifiés, mais ne saurait être tenu pour responsable direct ou indirect des erreurs, d’une
                        absence de disponibilité des informations et/ou de la présence de virus sur son site internet.
                        Les informations fournies dans ce site ne sont données qu’à titre indicatif, elles n’ont pas de
                        valeur contractuelle.
                        Le site internet est accessible 24 heures sur 24 et 7 jours sur 7.
                        dBs ne saurait toutefois être tenue pour responsable des interruptions de service, du mauvais
                        fonctionnement du service ou des difficultés de connexion au réseau de communications par lequel
                        ce site internet est accessible. En outre, pour des raisons de maintenance, dBs pourra
                        interrompre son site internet et s’efforcera d’en avertir préalablement les utilisateurs.
                        L’éditeur du site internet ne saurait être tenu responsable de l’accès à d’autres ressources
                        présentes sur le réseau Internet, par les utilisateurs, via les liens hypertextes mis en place
                        dans le cadre du site internet.</p>
                </article>
                <br/>
                <br/>
                <article>
                    <h2 className={"second-title-legals"}>VIII - Comportement de l’utilisateur</h2>
                    <p>L’utilisateur est seul juge de sa faculté, légale, contractuelle et/ou judiciaire à accéder au
                        site et/ou utiliser le site. À ce titre, en utilisant le Site, l’utilisateur reconnait qu’il ne
                        viole aucune disposition légale, contractuelle ou statutaire.
                        Comportements strictement interdits :<br/>
                        <ul>
                            <li> Tout comportement de nature à interrompre, suspendre, ralentir ou empêcher le bon fonctionnement
                            du Site</li>
                            <li> Toute atteinte aux mesures de sécurité</li>
                            <li> Toute intrusion ou tentative d’intrusion via tout type de programme informatique visant à
                            endommager ou à intercepter clandestinement tout système informatique, données ou informations
                            nominatives</li>
                            <li> Tout détournement des ressources système du site</li>
                            <li> Toute action de nature à imposer une charge disproportionnée sur les infrastructures de ce
                            dernier</li>
                            <li> Toute tentative d’induire en erreur d’autres utilisateurs en usurpant l’identité ou une
                            dénomination sociale ou en portant atteinte à l’image ou à la réputation d’autres personnes</li>
                            <li> Tout acte susceptible de porter atteinte aux droits et intérêts de dBs ou des utilisateurs de
                            son site</li>
                            <li> Tout non-respect total ou partiel des présentes CGU, ou des dispositions règlementaires
                            applicables</li>
                        </ul>
                    </p>
                </article>
                <br/>
                <br/>
                <article>
                    <h2 className={"second-title-legals"}>IX - Nullité partielle</h2>
                    <p>Si l’une des dispositions des CGU est déclarée nulle et sans effet par une décision
                        définitive rendue par une autorité compétente, les conditions restantes resteront en vigueur
                        et ne seront pas affectées par une telle déclaration de nullité.</p>
                </article>
                <br/>
                <br/>
                <article>
                    <h2 className={"second-title-legals"}>X - Droit applicable en cas de litiges</h2>
                    <p>Les CGU, et toute question relative à l’interprétation, à l’exécution ou à l’inexécution de
                        celles-ci sont régies par les lois françaises, sans préjudice de l’application de la
                        réglementation communautaire et des traités internationaux en vigueur, le cas échéant.
                        Tout litige afférent aux CGU sera de la compétence des tribunaux français.</p>
                </article>
            </section>

                <div className={"main-content-legals-3"}>
                    <motion.img
                        initial={{opacity: 0, scale: 0.9}}
                        whileInView={{opacity: 1, scale: 1}}
                        viewport={{once: true}}
                        transition={{duration: 2}}
                        src={item2} className={"item-son-legals"}>
                    </motion.img>
                </div>

            </div>
        </>
    );
}

export default Legals;
