# Project status
[![Stories in Ready](https://badge.waffle.io/refugeetech/platform.png?label=ready&title=Ready)](http://waffle.io/refugeetech/platform)

[![Throughput Graph](https://graphs.waffle.io/refugeetech/platform/throughput.svg)](https://waffle.io/refugeetech/platform/metrics)

## Introduction

The platform connects tech projects, public and private initiatives, challanges, crowdsourcing of challanges and crowdsourcing of ideas to solve challanges, volunteers and resources (cash, products & services, etc) and their respective sponsors. The platform is a nexus for community building and collaboration and a resource to bootstrap projects that are doing things that target the integration process.

The platform is made up of major parts that are integrated and intertwined:

* Project Hub: Contains Projects and Organizations
* Resource Hub: Funding (Grants(Cash, Material(Office space, Laptops, etc), Products&Services(Slack, Github, Etc), Knowledge(Expertise(Skills*Time):Volunteering, Information resources))
* Knowledge Hub: Challanges, Solutions, Ideas, Q&A, Forum  ,, ; Is crowdsourced 
* Associations: Relationships exist between project, challanges they target, other projects targeting a specific challange, partners/financers/volunteers of a projects, etc.

## The purpose and background of the Project Hub

The project hub focuses on projects that are doing things for the integration of newly arrived. Tech projects are projects focuses on tech. There are other initiatives such as publicly or privately run refugee camps, transit housing, volunteering networks such as Refugees Welcome, and others.

## High level requirements of the minimum viable Project Hub

* Projects should be able to “apply” to be listed on the project hub.
* Tech projects and other initiatives are made distinct on the hub which makes it easy for visitors to know what kind of project it is*.
* Projects are searchable and filterable. They are presented in a nice and compelling list. Filter parameters are based on challange category that the project is targeting.
* Projects can be targeting one or more specific issues under some category. These specific issues exists in our challange hub as uniquely identifiable issues that has been found through our workshop or crowdsourcing activities.
* Projects have profiles that give information about their project and what they are doing and for whom. The previously mentioned “targeting” issues that projects are trying to solve is visible in the project profile. Clicking on such an issue shows a short summary of that issue. One can also browse to and redirect to the source (on the challange hub if exists otherwise documents and other source files).
* Projects can make request for assistance. The format of these requests (when published) should be similar to Issues and presented as “project specific” issues/challanges and a reference to what skills are potentially needed to solve that issue**.
* Social account login (linkedin, twitter, facebook, google, openID)

## Requirements shortlist for MVP Project hub

* Apply to be listed
  * USE CASE SUGGESTION #1: Click Apply => Create an account => Fill in project profile (Is Application form) => Pending review status
* Lists projects and initiatives
* Filter projects by ? [issue]
* Search projects
  * text search
    * autocomplete
  * Zoomable TreeMaps [wishlist]
    * Create a parser from schema to json that makes for a good use case
* Accounts
* Project profile page
* Make requests
* Social account login (linkedin, twitter, facebook, google, openID)

### First phase functionality (IN PROGRESS)
__Create the Platform foundation__

First phase => Apply to be listed, List projects and initatives, Search or fileter by project variables(see below), project profile page, Accounts, Social login
* Project variables
  * Project name
  * Project stage
  * Challenge Categories
  * Challange description
  * Solution Description (long)
  * Solution Summary (shorter)
  * Short description (tweet size)
  * Date listed
  * Project startup date
  * Geography
  * Target group
  * Target platforms (web,IOS,Android,Windows)
  * Contact Person
  * Upvotes
  * Links
  * List of skills needed
  * List of resources needed
  * Link to Form for volunteering
  * Team description
  * Contact form
* Project Account
  * Project profile
    * if !pending review then visible
* Private account
  * Social login

## Second phase functionality (not yet started)
__Initiating the Resource Hub and linking with Project Hub__

Second phase => make requests
* Account
  * Import skills from LinkedIn
  * Add skill to profile
* Account types: Added
  * Organization
* Project profile page

## Third phase functionality (not yet started)
__Initiating the Knowledge Hub and extending the Project Hub__

#### Knowledge Hub
* Publishing challanges
  * Descriptions (long,shorter,short)
  * tags || categories || (tags && categories)
* Related projects (which projects are targeting these challanges)


#### Project Hub
* Project profile
  * Related challanges
* Crowdsourcing
  * Upvoting
  * Link Cotunity.com widgets to challanges for 'free text' crowdsourcing
  * Associate project/challange to challange/project

## Fourth phase functionality (not yet started)
__Stepping up the Resource Hub__

#### Resource Hub (project perspective)
* Project
  * Resources
    * Volunteer
      * Volunteering hours
    * Financer
      * A Grant
      * Materials are Grants are owned by a financer
      * Can finance a project
      * Is owned by a financer
      * Housing
      * Office space
      * Laptops, etc
#### Project Hub
* Project
  * Project profile
    * List project volunteers
    * Lists project partners
    * Lists project financers
    * List project ambassadors
* Account
  * Private account
    * Can volunteer (status WITH project if ACCEPTED by project) || (status SET by project if ACCEPTED by private account)
    * Can be ambassador (project SET private account status WITH project)
  * Organization && Project Account
    * Can partner with an organization
  * Organization
    * Can sponsor a project
    * Can partner with project
    * Can partner with organization
    * Can Finance
    * Can have grants
    * Is of types: business, ngo, etc
  * Project
    * Can partner with organization
    * Can partner with project?




`*` The most important reason for this distinction is our view of other initiatives not focusing on tech to be challange owners; those who are working most closely with refugees. As challange owners they are potential users or partners with tech
focused projects. This makes it important to facilitate cooperation between them. To make them distinct in the project hub
lifts this point somewhat. Of course tech project could be working just as close with refugees as other projects. But tech is a tool that needs to be distributed and applied. Most tech initiatives therefore needs partners who are working directly with refugees and who can distribute their tech solutions.

 `**`This data/presentation structure will create coherence throughout the platform and “drilldown” use cases. For example
one could start by browsing categories of Issue/challanges on the challange/issue hub, then drill down to specific challanges and further down to projects specific challanges that are faced by projects targeting those issue. Finally one could be able to assist to a project specific issue using ones resources or knowledge as requested or by reaching out with a different idea of how to be able to help.

# Design
# User Interface terminology
Our User Interface has the following elements.

## Left navbar
The left navbar contains Refugee Tech Logo ('R' Refugee Tech) and several links. It is defined with the Bootstrap `navbar-left` class. Navbar items are added to an unordered list with the Bootstrap `navbar-left` class.

Navbar left will contain the following links:
* What we do
* Knowledge Hub
* Projects
* Blog

## Right navbar
The right navbar is defined with the Bootstrap `navbar-left` class. Navbar items are added to an unordered list with the Bootstrap `navbar-left` class.

The `right-navbar` list will contain several links:
* Language menu
* Share button
* Search button
