import Store from '@core/model/store';
import {action, observable} from '@core/common/mobx';
import uuid from '@core/common/uuid';
import API from '../api';

const apiCache = {};

class SampleStore extends Store {
    constructor(props) {
        super(props);

        const { namespace, username, getTokenFunction } = props;

        if (!apiCache[namespace]) {
            apiCache[namespace] = new API({
                getTokenFunction,
                username
            });
        }

        this.api = apiCache[namespace];
    }


    @observable listTodo = [
        {
            id: 1,
            name: 'Nguyen The Nhat',
            age: 24,
            gtinh: 'Male',
            email: 'thenhat@gmail.com',
            status: 'Active'

        }, {
            id: 2,
            name: 'Nguyen The Quyen',
            age: 22,
            gtinh: 'Male',
            email: 'thequyen@gmail.com',
            status: 'Inactive'

        }, {
            id: 3,
            name: 'Nguyen Hoang Nhi',
            age: 21,
            gtinh: 'Female',
            email: 'vannam@gmail.com',
            status: 'Active'

        }, {
            id: 4,
            name: 'Nguyen The Khai',
            age: 22,
            gtinh: 'Male',
            email: 'thequyen@gmail.com',
            status: 'Active'

        }, {
            id: 5,
            name: 'Nguyen Thi Ha',
            age: 21,
            gtinh: 'Female',
            email: 'vannam@gmail.com',
            status: 'Inactive'

        }, {
            id: 6,
            name: 'Nguyen Thi Chinh',
            age: 22,
            gtinh: 'Female',
            email: 'thequyen@gmail.com',
            status: 'Inactive'

        }, {
            id: 7,
            name: 'Nguyen Van Thinh',
            age: 21,
            gtinh: 'Other',
            email: 'vannam@gmail.com',
            status: 'Active'

        }
    ]

    @observable listData = [
        {
            "id": "1",
            "first_name": "Ewald",
            "last_name": "Bashirian",
            "gender": "male",
            "dob": "2011-05-26",
            "email": "oda45@example.org",
            "phone": "+1 (371) 296-0299",
            "website": "http://www.satterfield.org/numquam-sit-reiciendis-illum-odit-quas-optio",
            "address": "6572 Marc Mills Suite 607\nBethbury, ND 09590",
            "status": "inactive",
            "_links": {
                "self": {
                    "href": "https://gorest.co.in/public-api/users/1"
                },
                "edit": {
                    "href": "https://gorest.co.in/public-api/users/1"
                },
                "avatar": {
                    "href": "https://lorempixel.com/250/250/people/?72063"
                }
            }
        },
        {
            "id": "2",
            "first_name": "Layla",
            "last_name": "Jaskolski",
            "gender": "female",
            "dob": "1973-07-26",
            "email": "leanne.robel@example.org",
            "phone": "941.852.8931",
            "website": "http://www.johnston.com/",
            "address": "63335 Malachi Rapids Suite 037\nNew Consueloside, NV 79375-8450",
            "status": "inactive",
            "_links": {
                "self": {
                    "href": "https://gorest.co.in/public-api/users/2"
                },
                "edit": {
                    "href": "https://gorest.co.in/public-api/users/2"
                },
                "avatar": {
                    "href": "https://lorempixel.com/250/250/people/?36416"
                }
            }
        },
        {
            "id": "3",
            "first_name": "Sydnie",
            "last_name": "Heller",
            "gender": "female",
            "dob": "1961-04-02",
            "email": "vkreiger@example.org",
            "phone": "1-887-936-4942",
            "website": "http://morissette.info/est-et-quasi-sit-molestias-repudiandae-ratione-ea",
            "address": "44936 Larkin Square Apt. 450\nNew Amelieview, OR 94377-8339",
            "status": "inactive",
            "_links": {
                "self": {
                    "href": "https://gorest.co.in/public-api/users/3"
                },
                "edit": {
                    "href": "https://gorest.co.in/public-api/users/3"
                },
                "avatar": {
                    "href": "https://lorempixel.com/250/250/people/?72977"
                }
            }
        },
        {
            "id": "4",
            "first_name": "Kaden",
            "last_name": "Schowalter",
            "gender": "male",
            "dob": "1948-04-17",
            "email": "reyes16@example.com",
            "phone": "1-419-763-2978 x837",
            "website": "http://www.nader.info/laboriosam-cupiditate-fugiat-velit-velit-exercitationem",
            "address": "5633 Roosevelt Rapid Suite 028\nStrosinshire, CA 13840-6855",
            "status": "inactive",
            "_links": {
                "self": {
                    "href": "https://gorest.co.in/public-api/users/4"
                },
                "edit": {
                    "href": "https://gorest.co.in/public-api/users/4"
                },
                "avatar": {
                    "href": "https://lorempixel.com/250/250/people/?38246"
                }
            }
        },
        {
            "id": "5",
            "first_name": "Donato",
            "last_name": "Hane",
            "gender": "male",
            "dob": "1947-09-18",
            "email": "donna53@example.net",
            "phone": "+13599192460",
            "website": "http://www.altenwerth.com/aliquam-minima-laborum-iure-fugiat-dignissimos-ut.html",
            "address": "2690 Stehr Bypass\nMosciskistad, MN 55741",
            "status": "active",
            "_links": {
                "self": {
                    "href": "https://gorest.co.in/public-api/users/5"
                },
                "edit": {
                    "href": "https://gorest.co.in/public-api/users/5"
                },
                "avatar": {
                    "href": "https://lorempixel.com/250/250/people/?22493"
                }
            }
        },
        {
            "id": "6",
            "first_name": "Golden",
            "last_name": "Turner",
            "gender": "male",
            "dob": "1970-09-22",
            "email": "ethan73@example.com",
            "phone": "462.867.5219 x68853",
            "website": "http://www.prohaska.com/suscipit-veniam-aut-voluptatem-et.html",
            "address": "1005 Marques Expressway\nIvahside, CO 57977-8495",
            "status": "active",
            "_links": {
                "self": {
                    "href": "https://gorest.co.in/public-api/users/6"
                },
                "edit": {
                    "href": "https://gorest.co.in/public-api/users/6"
                },
                "avatar": {
                    "href": "https://lorempixel.com/250/250/people/?82234"
                }
            }
        },
        {
            "id": "7",
            "first_name": "Joanne",
            "last_name": "Rath",
            "gender": "female",
            "dob": "1929-04-18",
            "email": "pietro.blick@example.org",
            "phone": "+1 (902) 275-2354",
            "website": "http://waters.com/sed-neque-saepe-voluptas-est",
            "address": "78513 Grimes Walks\nLake Abner, ND 94688-6743",
            "status": "inactive",
            "_links": {
                "self": {
                    "href": "https://gorest.co.in/public-api/users/7"
                },
                "edit": {
                    "href": "https://gorest.co.in/public-api/users/7"
                },
                "avatar": {
                    "href": "https://lorempixel.com/250/250/people/?83500"
                }
            }
        },
        {
            "id": "8",
            "first_name": "Willow",
            "last_name": "Farrell",
            "gender": "female",
            "dob": "2009-10-21",
            "email": "harber.milton@example.com",
            "phone": "1-259-794-5811 x450",
            "website": "http://www.kirlin.com/tempore-ea-earum-officia-ut-temporibus",
            "address": "972 Clementina Island Apt. 264\nNew Ryleigh, ND 34573-2191",
            "status": "inactive",
            "_links": {
                "self": {
                    "href": "https://gorest.co.in/public-api/users/8"
                },
                "edit": {
                    "href": "https://gorest.co.in/public-api/users/8"
                },
                "avatar": {
                    "href": "https://lorempixel.com/250/250/people/?71704"
                }
            }
        },
        {
            "id": "9",
            "first_name": "Gregoria",
            "last_name": "Huel",
            "gender": "female",
            "dob": "1926-03-24",
            "email": "reanna.thompson@example.com",
            "phone": "519.844.9466",
            "website": "http://www.hamill.biz/eveniet-enim-voluptatem-ducimus-incidunt-aliquam.html",
            "address": "44431 Quentin Run Apt. 703\nMiguelfort, CO 40894-7650",
            "status": "inactive",
            "_links": {
                "self": {
                    "href": "https://gorest.co.in/public-api/users/9"
                },
                "edit": {
                    "href": "https://gorest.co.in/public-api/users/9"
                },
                "avatar": {
                    "href": "https://lorempixel.com/250/250/people/?53156"
                }
            }
        },
        {
            "id": "10",
            "first_name": "Dayna",
            "last_name": "Johns",
            "gender": "female",
            "dob": "1931-04-14",
            "email": "douglas65@example.com",
            "phone": "510-602-9754",
            "website": "https://barton.info/possimus-odio-impedit-assumenda-et.html",
            "address": "3466 Weldon Dale\nPort Berry, MD 30801-0804",
            "status": "inactive",
            "_links": {
                "self": {
                    "href": "https://gorest.co.in/public-api/users/10"
                },
                "edit": {
                    "href": "https://gorest.co.in/public-api/users/10"
                },
                "avatar": {
                    "href": "https://lorempixel.com/250/250/people/?83531"
                }
            }
        },
        {
            "id": "11",
            "first_name": "Minerva",
            "last_name": "Grant",
            "gender": "female",
            "dob": "1986-03-29",
            "email": "mikayla85@example.org",
            "phone": "750-594-2351 x9725",
            "website": "http://pacocha.com/quae-laboriosam-quisquam-repellat-eos-nam",
            "address": "803 Stefan Landing Apt. 162\nPort Justine, NM 09007",
            "status": "active",
            "_links": {
                "self": {
                    "href": "https://gorest.co.in/public-api/users/11"
                },
                "edit": {
                    "href": "https://gorest.co.in/public-api/users/11"
                },
                "avatar": {
                    "href": "https://lorempixel.com/250/250/people/?32801"
                }
            }
        },
        {
            "id": "12",
            "first_name": "Carley",
            "last_name": "D'Amore",
            "gender": "female",
            "dob": "1965-12-21",
            "email": "psimonis@example.org",
            "phone": "+1-946-638-6822",
            "website": "http://bergnaum.com/et-porro-voluptatibus-autem-vel-aut.html",
            "address": "464 McDermott Hills Suite 604\nClaudiaton, AL 44661-0483",
            "status": "active",
            "_links": {
                "self": {
                    "href": "https://gorest.co.in/public-api/users/12"
                },
                "edit": {
                    "href": "https://gorest.co.in/public-api/users/12"
                },
                "avatar": {
                    "href": "https://lorempixel.com/250/250/people/?16562"
                }
            }
        },
        {
            "id": "13",
            "first_name": "America",
            "last_name": "Stanton",
            "gender": "female",
            "dob": "1923-10-20",
            "email": "garrett10@example.net",
            "phone": "(430) 388-6519 x8613",
            "website": "http://www.roberts.org/laborum-nobis-perspiciatis-sed-ea-ab-et-magnam",
            "address": "64591 Oceane Crossroad Apt. 990\nPort Stuart, MO 00669-0153",
            "status": "inactive",
            "_links": {
                "self": {
                    "href": "https://gorest.co.in/public-api/users/13"
                },
                "edit": {
                    "href": "https://gorest.co.in/public-api/users/13"
                },
                "avatar": {
                    "href": "https://lorempixel.com/250/250/people/?16027"
                }
            }
        },
        {
            "id": "14",
            "first_name": "Camille",
            "last_name": "Gerhold",
            "gender": "female",
            "dob": "1976-09-23",
            "email": "fgoyette@example.org",
            "phone": "+14349106432",
            "website": "http://bosco.com/minima-ex-autem-quibusdam-libero",
            "address": "20382 Isaiah Cove\nSouth Lexusfurt, IN 67192-7426",
            "status": "inactive",
            "_links": {
                "self": {
                    "href": "https://gorest.co.in/public-api/users/14"
                },
                "edit": {
                    "href": "https://gorest.co.in/public-api/users/14"
                },
                "avatar": {
                    "href": "https://lorempixel.com/250/250/people/?13081"
                }
            }
        },
        {
            "id": "15",
            "first_name": "Tremaine",
            "last_name": "D'Amore",
            "gender": "male",
            "dob": "2011-10-23",
            "email": "priscilla.brown@example.net",
            "phone": "290.495.4909 x96791",
            "website": "http://www.doyle.com/odio-iusto-et-culpa-fugit-nihil-ut-ut",
            "address": "8831 Hertha Station\nMauricebury, WI 42945-1413",
            "status": "active",
            "_links": {
                "self": {
                    "href": "https://gorest.co.in/public-api/users/15"
                },
                "edit": {
                    "href": "https://gorest.co.in/public-api/users/15"
                },
                "avatar": {
                    "href": "https://lorempixel.com/250/250/people/?70693"
                }
            }
        },
        {
            "id": "16",
            "first_name": "Zella",
            "last_name": "Heathcote",
            "gender": "female",
            "dob": "1984-05-20",
            "email": "wparker@example.com",
            "phone": "+15506086505",
            "website": "http://okuneva.biz/eius-mollitia-non-veritatis-autem-illo",
            "address": "533 Spencer Plaza\nSouth Javon, LA 61505",
            "status": "inactive",
            "_links": {
                "self": {
                    "href": "https://gorest.co.in/public-api/users/16"
                },
                "edit": {
                    "href": "https://gorest.co.in/public-api/users/16"
                },
                "avatar": {
                    "href": "https://lorempixel.com/250/250/people/?45442"
                }
            }
        },
        {
            "id": "17",
            "first_name": "Emelie",
            "last_name": "Gleichner",
            "gender": "female",
            "dob": "1990-03-22",
            "email": "stanley.effertz@example.org",
            "phone": "(345) 539-3913",
            "website": "https://jacobs.com/nostrum-ut-voluptatem-dolorem-eos-ab-nam.html",
            "address": "339 Hilpert Union\nPort Juanachester, MO 10828-8583",
            "status": "active",
            "_links": {
                "self": {
                    "href": "https://gorest.co.in/public-api/users/17"
                },
                "edit": {
                    "href": "https://gorest.co.in/public-api/users/17"
                },
                "avatar": {
                    "href": "https://lorempixel.com/250/250/people/?23684"
                }
            }
        },
        {
            "id": "18",
            "first_name": "Cecil",
            "last_name": "Anderson",
            "gender": "male",
            "dob": "2001-02-26",
            "email": "caleigh.renner@example.com",
            "phone": "1-968-647-5727",
            "website": "http://www.mann.com/qui-voluptatem-voluptatibus-quas",
            "address": "59215 Nakia Skyway Apt. 737\nSouth Gunnar, WY 01401-0743",
            "status": "active",
            "_links": {
                "self": {
                    "href": "https://gorest.co.in/public-api/users/18"
                },
                "edit": {
                    "href": "https://gorest.co.in/public-api/users/18"
                },
                "avatar": {
                    "href": "https://lorempixel.com/250/250/people/?94072"
                }
            }
        },
        {
            "id": "19",
            "first_name": "Ivory",
            "last_name": "Kemmer",
            "gender": "female",
            "dob": "1942-01-08",
            "email": "nadia93@example.com",
            "phone": "358-609-6963 x79376",
            "website": "http://www.rath.com/autem-vitae-ducimus-velit-fuga-sint.html",
            "address": "55254 Donavon Light\nPort Carmen, IA 87999",
            "status": "inactive",
            "_links": {
                "self": {
                    "href": "https://gorest.co.in/public-api/users/19"
                },
                "edit": {
                    "href": "https://gorest.co.in/public-api/users/19"
                },
                "avatar": {
                    "href": "https://lorempixel.com/250/250/people/?19454"
                }
            }
        },
        {
            "id": "20",
            "first_name": "Ole",
            "last_name": "Stamm",
            "gender": "male",
            "dob": "2004-01-11",
            "email": "estrella61@example.org",
            "phone": "492-556-4879",
            "website": "http://stoltenberg.com/praesentium-blanditiis-deleniti-id-accusantium-voluptate-consequatur-ipsa",
            "address": "707 Ludie Flat Suite 424\nCristmouth, GA 34481",
            "status": "inactive",
            "_links": {
                "self": {
                    "href": "https://gorest.co.in/public-api/users/20"
                },
                "edit": {
                    "href": "https://gorest.co.in/public-api/users/20"
                },
                "avatar": {
                    "href": "https://lorempixel.com/250/250/people/?43097"
                }
            }
        }
    ]

    @action addData(opts) {
        return new Promise((resolve) => {
            if(opts.Id == 0)
            {
                const data = {
                    id: uuid(),
                    first_name:opts.First_name,
                    last_name: opts.Last_name,
                    phone: opts.Phone,
                    gender: opts.Gender,
                    email: opts.Email,
                    status: opts.Status
                };
                this.listData.push(data);
                resolve(data.id);
            }
            else{
                const todo = this.listData.find(t => t.id == opts.Id);
                todo.first_name = opts.First_name;
                todo.last_name = opts.Last_name;
                todo.phone = opts.Phone;
                todo.gender = opts.Gender;
                todo.email = opts.Email;
                todo.status = opts.Status;
                resolve(todo.id);
            }
        });
    }

    @action getTodoDetailData(id) {
        return new Promise((resolve) => {
            const todo = this.listData.find(t => t.id == id);
            resolve(todo);
        });
    }

    @action removeData(id) {
        return new Promise((resolve) => {
            const idx = this.listData.findIndex(t => t.id == id);
            if (idx !== -1) {
                this.listData.splice(idx, 1);
            }
            resolve('Done')
        })
    }



@action addTodo(opts) {
        return new Promise((resolve) => {
            if(opts.Id == 0)
            {
                const data = {
                    id: uuid(),
                    name: opts.Name,
                    age: opts.Age,
                    gtinh: opts.Gtinh,
                    email: opts.Email,
                    status: opts.Status
                };
                this.listTodo.push(data);
                resolve(data.id);
            }
            else{
                const todo = this.listTodo.find(t => t.id == opts.Id);
                todo.name = opts.Name;
                todo.age = opts.Age;
                todo.gtinh = opts.Gtinh;
                todo.email = opts.Email;
                todo.status = opts.Status;
                resolve(todo.id);
            }
        });
    }

    @action getTodoDetail(id) {
        return new Promise((resolve) => {
            const todo = this.listTodo.find(t => t.id == id);
            resolve(todo);
        });
    }

    @action removeTodo(id) {
        return new Promise((resolve) => {
            const idx = this.listTodo.findIndex(t => t.id == id);
            if (idx !== -1) {
                this.listTodo.splice(idx, 1);
            }
            resolve('Done')
        })
    }
    @action
    getUsers() {
        return new Promise((resolve, reject) => {

            this.api.getUsers()
                .then(data => {

                    resolve(data);

                })
                .catch(err => {
                    reject(err);
                })
        });
    }
}

export default SampleStore;
