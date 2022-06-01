const template = document.createElement('template')
template.innerHTML = `

<link rel="stylesheet" type="text/css" href="header.css" media="screen" />
<link rel="stylesheet" type="text/css" href="results.css" media="screen" />
<div class="header">
    <div class="left-container">
        <img src='https://www.svgrepo.com/show/391458/github.svg' class='github-icon' alt="github-icon" />
        <form action="" id="form">
            <input id="search" type="text" placeholder="Search or jump to...">
            <input type="submit" class="header-submit" value="/">
        </form>
        
        <div class="header-nav">
            <img src="https://www.svgrepo.com/show/36538/menu.svg" class="hamburger" />
            <div class="desktop-tabs">
                <div>Pull Requests</div>
                <div>Issues</div>
                <div>Marketplace</div>
                <div>Explore</div>
            </div>
        </div>
    </div>
    <div class="right-container">
        <div>
            <div class="blue-dot"></div>
            <img src='https://www.svgrepo.com/show/47940/bell.svg' class='bell-icon' alt='notifications' />
        </div>
        <div class="dropdown-icons">
            <img src='https://www.svgrepo.com/show/311489/add.svg' class='plus-icon' alt='dropdown' />
            <img src='https://www.svgrepo.com/show/335062/dropdown.svg' class='dropdown-icon' alt='dropdown' />
        </div>
        <div class="dropdown-icons">
            <img src="" id="header-avatar"></img>
            <img src='https://www.svgrepo.com/show/335062/dropdown.svg' class='dropdown-icon' alt='dropdown' />
        </div>
    </div>
</div>
<div id='repo-nav' class='repositories-nav'></div>
<div class="page-content">
        <div class="profile">
            <img src="" id="user-avatar"></img>
            <div id="name"></div>
            <div id="user-name"></div>
            <div id="bio"></div>
        </div>
        <div class="repositories">
            <div id="repo-search"></div>
            <div id="list-length"></div>
            <div id="results"></div>
        </div>
    </div>

`

class App extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
        this.shadowRoot.appendChild(template.content.cloneNode(true))
        let form = this.shadowRoot.getElementById('form')
        console.log('form', form)
        form.addEventListener('submit', (e) => {
            e.preventDefault()
        
            let search = this.shadowRoot.getElementById('search').value
        
            fetch(`https://api.github.com/users/${search}`)
                .then(response => response.json())
                .then((data) => {
                    console.log(data)
                    this.shadowRoot.getElementById("user-avatar").src = data.avatar_url
                    this.shadowRoot.getElementById("header-avatar").src = data.avatar_url
                    this.shadowRoot.getElementById("list-length").innerHTML = `
                        <hr>
                        <div>${data.public_repos} results for public repositories</div>
                        <hr>
                    `
                    this.shadowRoot.getElementById("name").innerHTML = data.name
                    this.shadowRoot.getElementById("user-name").innerHTML = data.login
                    this.shadowRoot.getElementById("bio").innerHTML = data.bio
                    this.shadowRoot.getElementById("repo-nav").innerHTML = `
                    <div></div>
                    <div class='repositories-nav-items'>
                        <div>
                            <img class='repo-nav-icons' src='https://www.svgrepo.com/show/51050/open-book.svg' alt='' >
                            <div class='repo-nav-titles'>Overview</div>
                        </div>
                        <div class="selected">
                            <img class='repo-nav-icons' src='https://www.svgrepo.com/show/11155/book.svg' alt='' >
                            <div class="row"><div class="repo-nav-titles">Repositories</div> <div class="repo-count-tab">${data.public_repos}</div></div>
                        </div>
                        <div>
                            <img class='repo-nav-icons' src='https://www.svgrepo.com/show/35200/layout-square-symbol.svg' alt='' >
                            <div class='repo-nav-titles'>Projects</div>
                        </div>
                        <div>
                            <img class='repo-nav-icons' src='https://www.svgrepo.com/show/101042/cube.svg' alt='' >
                            <div class='repo-nav-titles'>Packages</div>
                        </div>
                        <div>
                            <img class='repo-nav-icons' src='https://www.svgrepo.com/show/20000/star.svg' alt='' >
                            <div class='repo-nav-titles'>Stars</div>
                        </div>
                    </div>
                    `
                    this.shadowRoot.getElementById("repo-search").innerHTML = `
                        <input type="text" placeholder="Find a repository..."/>
                    ` 
        
                })
            fetch(`https://api.github.com/users/${search}/repos?sort=updated`)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                const languageColor = (lang) => {
                    let classColor = ''
                    switch(lang) {
                        case 'JavaScript':
                            classColor = 'javascript'
                            break;
                        case 'TypeScript':
                            classColor = 'typescript'
                            break;
                        case 'C':
                            classColor = 'c'
                            break;
                        case 'C#':
                            classColor = 'csharp'
                            break;
                        case 'C++':
                            classColor = 'cplusplus'
                            break;
                        case 'Vim script':
                            classColor = 'vim'
                            break;
                        case 'Shell':
                            classColor = 'shell'
                            break;
                        case 'CSS':
                            classColor = 'css'
                            break;
                        case 'SCSS':
                            classColor = 'scss'
                            break;
                        case 'ASP.NET':
                            classColor = 'asp-net'
                            break;
                        case 'HTML':
                            classColor = 'html'
                            break;
                        case 'CSS':
                            classColor = 'css'
                            break;
                        case 'CSS':
                            classColor = 'css'
                            break;
                        case 'Vue':
                            classColor = 'vue'
                            break;
                        case 'Ruby':
                            classColor = 'ruby'
                            break;
                        case 'CoffeeScript':
                            classColor = 'coffee'
                            break;
                        case 'PHP':
                            classColor = 'php'
                            break;
                        case 'Objective-C':
                            classColor = 'objective-c'
                            break;
                        case 'Objective-C++':
                            classColor = 'objective-cplusplus'
                            break;
                        case 'Java':
                            classColor = 'java'
                            break;
                        case null:
                            classColor = 'javascript'
                    }
                    return classColor;   
                }

                this.shadowRoot.getElementById("results").innerHTML = `
                    
                    ${data.slice(0, 20).map((repo) => (
                        `
                        <link rel="stylesheet" type="text/css" href="languages.css" media="screen" />
                        <h3>${repo.name}</h3>
                        <div class="repo-info">
                            <div class="repo-subtitles">
                                <div class=${languageColor(repo.language)} id="language-icon"></div>
                                ${repo.language === null ? 'JavaScript' : repo.language}
                            </div>
                            <div class="repo-subtitles">
                                <img class="repo-subtitle-icon" src="https://www.svgrepo.com/show/20000/star.svg" alt="stargazers count" />
                                ${repo.stargazers_count}
                            </div>
                            <div class="repo-subtitles">
                                <img class="repo-subtitle-icon" src="https://www.svgrepo.com/show/391226/git-fork.svg" alt="forks count" />
                                ${repo.forks}
                            </div>
                            <div>Updated on ${repo.updated_at}</div>
                        </div>
                        <hr>
                        `
                    )).join('')}
                `
            })
        })
    }
    
}

window.customElements.define('app-component', App)