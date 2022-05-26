import { createServer, Factory, Model, Response, ActiveModelSerializer } from 'miragejs';
import faker from 'faker';


type User = {
    name: string;
    email: string;
    created_at: string;
}


export function makeServer() {

    const server = createServer({
        serializers: {
            application: ActiveModelSerializer,
        },
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
            server.createList('user', 200)
        },


        routes() {

            this.namespace = 'api';
            //Testar o loading
            this.timing = 750;

            this.get('/users', function (schema, request) {
                const { page = 1, per_page = 10 } = request.queryParams;

                const total = schema.all('user').length

                const pageStart = (Number(page) - 1) * Number(per_page);
                const pageEnd = pageStart + Number(per_page);

                const users = this.serialize(schema.all('user'))
                    .users.slice(pageStart, pageEnd)

                return new Response(
                    200,
                    { 'x-total-count': String(total) },
                    { users }
                )
            })

            this.get('/users/:id')
            this.post('/users')

            //Resetar o namespace para não causar conflito com alguma api route do next
            this.namespace = '';
            //para seguir para a api route do next
            this.passthrough();
        }
    });

    return server;
}