// Menü-Funktionalität: Schließt das Menü beim Klick außerhalb
document.addEventListener('DOMContentLoaded', function() {
    const toggler = document.querySelector('.menu-wrap .toggler');
    const menu = document.querySelector('.menu-wrap .menu');
    const menuWrap = document.querySelector('.menu-wrap');
    const hamburger = document.querySelector('.menu-wrap .hamburger');
    
    if (!toggler || !menu) return;
    
    // Variable um zu tracken ob gerade geöffnet wird
    let justOpened = false;
    
    // Trackt wenn das Menü geöffnet wird
    toggler.addEventListener('change', function() {
        if (toggler.checked) {
            justOpened = true;
            setTimeout(function() {
                justOpened = false;
            }, 100);
        }
    });
    
    // Schließt das Menü beim Klick auf das Overlay
    menu.addEventListener('click', function(event) {
        if (event.target === menu || event.target.closest('.menu > div') === menu.firstElementChild) {
            // Nur schließen wenn nicht auf Menü-Inhalt geklickt wurde
            const menuContent = menu.querySelector('ul');
            if (menuContent && !menuContent.contains(event.target)) {
                toggler.checked = false;
            }
        }
    });
    
    // Schließt das Menü beim Klick irgendwo im Document
    document.addEventListener('mousedown', function(event) {
        // Nicht schließen wenn gerade geöffnet wird
        if (justOpened) return;
        
        // Nur wenn Menü offen ist
        if (!toggler.checked) return;
        
        // Nicht schließen wenn auf Hamburger oder Checkbox geklickt wird
        if (menuWrap.contains(event.target)) return;
        
        // Schließen
        toggler.checked = false;
    }, true);
    
    // Schließt das Menü auch beim Klick auf einen Menü-Link
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            toggler.checked = false;
        });
    });
});
