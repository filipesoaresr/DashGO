import { createServer, Factory, Model } from 'miragejs';
import faker from 'faker';


type User = {
    name: string;
    email: string;
    created_at: string;
}


export function makeServer() {

    const server = createServer({
        models: {
            user: Model.extend<Partial<User>>({}) 
        },


        //Criar dados fake com o faker
        factories: {
            user: Factory.extend({
                name(i: number) {
                    return `User ${i + 1}`
                },
                email() {
                    return faker.internet.email().toLowerCase()
                },
                createdAt() {
                    return  faker.date.recent(10)
                }
            })
        },

        //Cria automaticamente os dados dos campos setados em factories
        seeds(server) {
            server.createList('user', 10)
        },


        routes() {

            this.namespace = 'api';
            //Testar o loading
            this.timing = 750;

            this.get('/users')
            this.post('/users')

            //Resetar o namespace para não causar conflito com alguma api route do next
            this.namespace = '';
            //para seguir para a api route do next
            this.passthrough();
        }
    });

    return server;
}