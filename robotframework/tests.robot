*** Settings ***
Library  SeleniumLibrary

*** Test Cases ***
Check main page
    Open Browser  http://localhost:8000/  Chrome
    Title Should Be  What\'s the weather?

    Wait Until Element Contains  id:location  Helsinki, FI
    Page Should Contain Image  id:icon
    Element Text Should Be  id:description  fog
    Element Text Should Be  id:temp  -8
    Element Text Should Be  id:tempMin  -9
    Element Text Should Be  id:tempMax  -6

    Page Should Contain Element  class:ant-table-thead
    Page Should Contain Element  class:ant-table-tbody

    Element Text Should Be  XPath://th[1]  DateTime
    Element Text Should Be  XPath://th[2]  Weather
    Element Text Should Be  XPath://th[3]  Temperature

    ${count} =  Get Element Count   //tbody/tr
    Should Be True  ${count}==10

    Element Text Should Be  XPath://tr[1]/td[1]  2022-12-25 21:00
    Page Should Contain Image  XPath://tr[1]/td/img
    Element Text Should Be  XPath://td/div/span[1]  -6
    Element Text Should Be  XPath://td/div/sup[1]  o

    Click Link  XPath://li[3]/a
    Wait Until Element Contains  XPath://tr[1]/td[1]  2022-12-27 03:00
    Page Should Contain Image  XPath://tr[1]/td/img
    Element Text Should Be  XPath://td/div/span[1]  -2
    Element Text Should Be  XPath://td/div/sup[1]  o

    Close Window