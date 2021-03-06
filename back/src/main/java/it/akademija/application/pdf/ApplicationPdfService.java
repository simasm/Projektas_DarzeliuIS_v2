package it.akademija.application.pdf;

 
import java.io.IOException;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import com.itextpdf.io.font.PdfEncodings;
import com.itextpdf.io.source.ByteArrayOutputStream;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.geom.Rectangle;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.draw.SolidLine;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.LineSeparator;
import com.itextpdf.layout.element.List;
import com.itextpdf.layout.element.ListItem;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Tab;
import com.itextpdf.layout.element.TabStop;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.element.Text;
import com.itextpdf.layout.property.ListNumberingType;
import com.itextpdf.layout.property.TabAlignment;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.layout.property.UnitValue;
import com.itextpdf.layout.property.VerticalAlignment;

import it.akademija.application.Application;
import it.akademija.application.ApplicationService;



@Service
public class ApplicationPdfService {
	
	public static final String DEST = "src/main/resources/";
	
	@Autowired
	private ApplicationService applicationService;
	

	public byte[] createPdf(String id) throws IOException{
		
		Application application = applicationService.getUserApplicationById(id);
		
		String filename = application.getChildName() + " " +
						  application.getChildSurname() + " " + id + " - " +
						  "Ikimokyklinio ugdymo sutartis";

	 
		//Initialize PDF writer
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		PdfWriter writer = new PdfWriter(byteArrayOutputStream);
		
		//Initialize PDF document
		PdfDocument pdf = new PdfDocument(writer);
		
		//Initialize document
	    Document document = new Document(pdf);	    
	    		
	    //Creating line text
	    LocalDate date = LocalDate.now();
	    String year = Integer.toString(date.getYear());
	    int month = date.getMonthValue();
	    String monthString = "";
	    switch (month) {
        case 1:  monthString = "Sausio";
                 break;
        case 2:  monthString = "Vasario";
                 break;
        case 3:  monthString = "Kovo";
                 break;
        case 4:  monthString = "Baland??io";
                 break;
        case 5:  monthString = "Gegu????s";
                 break;
        case 6:  monthString = "Bir??elio";
                 break;
        case 7:  monthString = "Liepos";
                 break;
        case 8:  monthString = "Rugpj????io";
                 break;
        case 9:  monthString = "Rugs??jo";
                 break;
        case 10: monthString = "Spalio";
                 break;
        case 11: monthString = "Lapkri??io";
                 break;
        case 12: monthString = "Gruod??io";
                 break;
        default: monthString = "Neteisingas m??nesis";
                 break;
        }	
	    String day = Integer.toString(date.getDayOfMonth());
	    
	    String nr = Long.toString(application.getId()); // Integer.toString(25698);
	    
	    Text dateString = new Text(year + " m. " + monthString + " " + day + " d. Nr. " + nr).setUnderline();

	    //Creating unicode with lithuanian letters
	    Resource fontResource = new ClassPathResource("fonts/arial.ttf");

		 
	    PdfFont lithuanian = PdfFontFactory.createFont(fontResource.getFile().getPath(), PdfEncodings.IDENTITY_H, true);
	    document.setFont(lithuanian);
	    
	    document.add(new Paragraph("IKIMOKYKLINIO UGDYMO PASLAUG?? SUTARTIS").setTextAlignment(TextAlignment.CENTER).setBold());

	    document.add(new Paragraph(dateString).setTextAlignment(TextAlignment.CENTER));
	    
	    //------------------ 
	    
	    String virsus1 = "Ikimokyklinio ugdymo paslaug?? sutartis sudaroma tarp ikimokyklinio ugdymo ??staigos ";
	    String virsus2 = application.getApprovedKindergarten().getName(); //" (Dar??elio pavadinimas) ";
	    String virsus3 = " atstovaujamo ";
	    String virsus4 = application.getApprovedKindergarten().getDirectorName() + " " + //" (Dar??elio direktorius) ";
	    		         application.getApprovedKindergarten().getDirectorSurname();     //" (Dar??elio direktorius) ";
	    String virsus5 = " veikian??ios pagal Dar??elio nuostatus ir T??v??/Glob??j?? (toliau - T??vai), atstovaujan??i?? vaiko interesus.";
	    
	    Paragraph virsus = new Paragraph();
	    
	    virsus.add(virsus1).setFirstLineIndent(25);
	    virsus.add(new Text(virsus2).setUnderline());
	    virsus.add(virsus3);
	    virsus.add(new Text(virsus4).setUnderline());
	    virsus.add(virsus5);
	    document.add(virsus);
	    
	    //------------------
	    
	    String tevu_vardas_pavarde =   application.getMainGuardian().getParentDetails().getName() + " " 
	    															   + application.getMainGuardian().getParentDetails().getSurname(); // "TVardas TPavarde"; 
	    String faktines_gyvenamosios_vietos_adresas =  application.getMainGuardian().getParentDetails().getAddress() + ", " + application.getMainGuardian().getParentDetails().getCity(); //"Vieta";
	    String telefono_Nr =  application.getMainGuardian().getParentDetails().getPhone(); // "Tel Nr.";
	    String el_pastas =    application.getMainGuardian().getParentDetails().getEmail(); // "el pastas";
	    
	    Paragraph para_tevu_vardas_pavarde = new Paragraph().add(new Tab()).add(tevu_vardas_pavarde).add(new Tab())  ;
	    Paragraph fakt = new Paragraph().add(new Tab()).add(faktines_gyvenamosios_vietos_adresas).add(new Tab());
	    Paragraph tel = new Paragraph().add(new Tab()).add(telefono_Nr).add(new Tab());
	    Paragraph email = new Paragraph().add(new Tab()).add(el_pastas).add(new Tab());

	    
	    PageSize pageSize1 = document.getPdfDocument().getDefaultPageSize();
	    Rectangle effectivePageSize1 = document.getPageEffectiveArea(pageSize1);
	    float rightTabStopPoint1 = effectivePageSize1.getWidth()/2 ;
	    TabStop tabStop1 = new TabStop(rightTabStopPoint1, TabAlignment.CENTER);
	    para_tevu_vardas_pavarde.addTabStops(tabStop1);
	    
	    fakt.setMarginTop(-13);
	    fakt.addTabStops(tabStop1);
	    fakt.setMarginBottom(0);
	    
	    tel.setMarginTop(-2);
	    tel.addTabStops(tabStop1);
	    tel.setMarginBottom(0);
	    
	    email.setMarginTop(-2);
	    email.addTabStops(tabStop1); 
	    email.setMarginBottom(0); 
	    
	    document.add(para_tevu_vardas_pavarde);
	    document.add(new LineSeparator(new SolidLine()).setMarginTop(-8));
	
	    Table table_tevu_vardas_pavarde = new Table(1) ;
	    table_tevu_vardas_pavarde.addCell(new Cell().add(new Paragraph(new Text("(T??v?? vardas, pavard??)").setTextRise(1).setFontSize(9)).setMarginLeft(210))
	    		                 .setBorder(Border.NO_BORDER));
	    
 
	    document.add(table_tevu_vardas_pavarde);
	    document.add(new Paragraph().add(new Tab()));

	    //  , telefono Nr., el. pa??tas)"
	    
	    Table tableAdresas = new Table(1) ;
	    tableAdresas.addCell(new Cell().add(new Paragraph(new Text("(faktin??s gyvenamosios vietos adresas)").setTextRise(1).setFontSize(9)).setMarginLeft(180))
	    		                 .setBorder(Border.NO_BORDER));
	  
	
	    document.add(fakt); 
	    document.add(new LineSeparator(new SolidLine()).setMarginTop(-2));

	    
	    document.add(tableAdresas);
	    document.add(new Paragraph().add(new Tab()));

	    
	    
	    Table tableTel = new Table(1) ;
	    tableTel.addCell(new Cell().add(new Paragraph(new Text("(telefono Nr.)").setTextRise(1).setFontSize(9)).setMarginLeft(230))
	    		                 .setBorder(Border.NO_BORDER));
	    
	    
	    document.add(tel);
	    document.add(new LineSeparator(new SolidLine()).setMarginTop(-2));

	    document.add(tableTel);
	    document.add(new Paragraph().add(new Tab()));


	    document.add(email);
	    document.add(new LineSeparator(new SolidLine()).setMarginTop(-2));
	    document.add(new Paragraph().add(new Tab()));

	    
	    Table tableElpastas = new Table(1) ;
	    tableElpastas.addCell(new Cell().add(new Paragraph(new Text("(el. pa??tas)").setTextRise(6).setFontSize(9)).setMarginLeft(230))
	    		                 .setBorder(Border.NO_BORDER));
	    document.add(tableElpastas);
	    document.add(new Paragraph().add(new Tab()));

	    document.add(new Paragraph("(Sutart?? pasira??ius vienam i?? T??v??, kitas i?? T??v?? neatleid??iamas nuo ??ios sutarties ??sipareigojim?? vykdymo)."));
	    
	    document.add(new Paragraph("I. SUTARTIES OBJEKTAS").setTextAlignment(TextAlignment.CENTER).setBold());
	    
	    String sutart1 = "Ikimokyklinio ugdymo paslaug?? sutartimi (toliau ??? Sutartis) Dar??elis ??sipareigoja teikti ugdymo paslaugas ";
	    String sutart2 = application.getChildName() + " " + application.getChildSurname();   // "Vardas Pavard??";
	    String sutart3 = " toliau ??? Ugdytinis,";
	    String sutart4 = "(vaiko vardas, pavard??)";
	    String sutart5 = "\no T??vai ??sipareigoja apmok??ti u?? ??ias paslaugas bei vykdyti visus ??sipareigojimus, prisiimtus Sutartimi.";
	    String sutart6 = "Ugdymo paslaugos apima sistemin?? neformalaus ugdym?? plano(-??), ugdymo programos(-??) sudarym?? ir ??gyvendinim?? atitinkamoms am??iaus grup??ms pagal LR ??vietimo ir mokslo ministerijos bei Klaip??dos rajono savivaldyb??s (toliau ??? Savivaldyb??) patvirtintas programas, rekomendacijas, tvarkos apra??us ir kitus norminius teis??s aktus.";
	    	    
	    Paragraph para = new Paragraph();
	    
	    para.add(sutart1).setFirstLineIndent(25);
	    para.add(new Text(sutart2).setUnderline());
	    para.add(sutart3);
	    document.add(para);
	    
	    Table table4 = new Table(1) ;
	    table4.addCell(new Cell().add(new Paragraph(new Text(sutart4).setTextRise(9).setFontSize(9)).setMarginLeft(55))
	    		                 .setBorder(Border.NO_BORDER));
	    document.add(table4);
	    Paragraph para2 = new Paragraph();
	    para2.setMarginTop(-30);
	    para2.add(sutart5);
	    para2.setMarginBottom(-5);
	    document.add(para2);
	    
	    document.add(new Paragraph(sutart6).setFirstLineIndent(25));
	    //para.add(sutart6);
	    
	    
	    //----
//	    document.add(new Paragraph(sutart1).add("______"+sutart2+"_______").add(sutart3).setFirstLineIndent(25));
//	    document.add(new Paragraph(new Text(sutart4).setTextRise(10).setFontSize(8)).setFirstLineIndent(120));
//	    document.add(new Paragraph(sutart5));
//	    document.add(new Paragraph(sutart6).setFirstLineIndent(25));
	    
	  //------ Rules List start ---------------------------------------------------------------------------------------------------
	    
	    document.add(new Paragraph("II. SUTARTIES ??ALI?? ??SIPAREIGOJIMAI").setTextAlignment(TextAlignment.CENTER).setBold());
	    
	    List topLevel = new List(ListNumberingType.DECIMAL);
	    
	    ListItem item1 = new ListItem();
	    item1.add(new Paragraph().add("Dar??elis ??sipareigoja:").setBold());
	    
	    String textitalic = "* U?? papildomos, ??vietimo ??statymu nereglamentuotos, bet T??v?? pageidavimu vykdomos mokamos veiklos (b??reli??, u??si??mim??, studij?? ir kt.) kokyb?? Dar??elis neatsako.";
	    
	    List level2 = new List(ListNumberingType.DECIMAL);
	    level2.add("??gyvendinti ikimokyklinio ugdymo program??.").setPreSymbolText("1.");
	    level2.add("u??tikrinti, kad suteiktos paslaugos atitikt?? galiojan??ius teis??s aktus;").setPreSymbolText("1.");
	    level2.add("u??tikrinti, kad paslaugos atitikt?? ugdytinio poreikius, individualizuoti ir diferencijuoti\n" + 
	    		"ugdymo turin??, skiriant visoms vaiko raidos sritims ??? sveikatos, socialinei, kalbos, pa??inimo, meninei ??? vienod?? d??mes??, pritaikyti j?? speciali??j?? poreiki?? vaikams;").setPreSymbolText("1.");
	    level2.add("teikti pedagogin??, speciali??j?? pedagogin?? pagalb??, kineziterapeuto, masa??uotojo, regos korekcijos specialisto paslaugas, bendrauti ir bendradarbiauti su speciali??j?? poreiki?? vaik?? individualios korekcin??s pagalbos institucijomis;").setPreSymbolText("1.");
	    level2.add("organizuoti medicinin?? pagalb?? Ugdytiniui nelaim??s atveju. Ugdytiniui susirgus ar susi??eidus informuoti T??vus;").setPreSymbolText("1.");
	    level2.add("* organizuoti papildomo ugdymo veikl?? atsi??velgiant ?? vaiko poreikius ir ??staigos galimybes;\n"  ).setPreSymbolText("1.");
	    document.add(new Paragraph(textitalic).setFontSize(8).setItalic());
	    level2.add("ugdymosi pasiekimus vertinti objektyviai ir ne??ali??kai, vadovaujantis individualios pa??angos principu;").setPreSymbolText("1.");
	    level2.add("teikti informacij?? apie Ugdytinio pasiekimus, elges?? T??vams ir saugoti ??ios informacijos konfidencialum??.").setPreSymbolText("1.");
	    level2.add("bendradarbiauti su T??vais sprend??iant ugdymo proceso organizavimo, vaik?? ugdymo(si) klausimus, inicijuoti T??v?? dalyvavim?? Dar??elio savivaldoje;").setPreSymbolText("1.");
	    level2.add("tvarkyti Ugdytinio asmens duomenis vadovaujantis Asmens duomen?? teisin??s apsaugos ??statymu.").setPreSymbolText("1.");
	    
	    item1.add(level2);
	    topLevel.add(item1);
	    
	    ListItem item2 = new ListItem();
	    item2.add(new Paragraph().add("Dar??elis turi teis??:").setBold());

	    List level3 = new List(ListNumberingType.DECIMAL);
	    level3.add("savo nuo??i??ra kurti ir taikyti pedagogin??s veiklos programas, metodus ir formas;").setPreSymbolText("2.");
	    level3.add("Sutartyje nustatytomis s??lygomis ir tvarka atsisakyti teikti ikimokyklinio ugdymo paslaugas ir nutraukti ??i?? sutart?? savo iniciatyva;").setPreSymbolText("2.");
	    level3.add("konsultuotis ir informuoti apie rimt?? Sutarties pa??eidim??, atitinkamas institucijas (Vaiko teisi?? apsaugos skyri??, Klaip??dos rajono pedagogin?? psichologin?? tarnyb?? ir pan.)").setPreSymbolText("2.");
	    level3.add("reikalauti, kad T??vai imt??si konkre??i?? priemoni?? d??l netinkamo Ugdytinio elgesio;").setPreSymbolText("2.");
	    level3.add("fotografuoti, filmuoti Ugdytin?? dar??elio ??ven??i??, ekskursij?? ir kit?? ugdymo tikslais organizuojam?? rengini?? metu.").setPreSymbolText("2.");
	    
	    item2.add(level3);
	    topLevel.add(item2);
	    
	    ListItem item3 = new ListItem();
	    item3.add(new Paragraph().add("T??vai ??sipareigoja:").setBold());
	    
	    List level4 = new List(ListNumberingType.DECIMAL);
	    level4.add("ugdyti vaiko pagarb?? mokytojams, bendraam??iams bei Dar??elio bendruomen??s nariams;").setPreSymbolText("3.");
	    level4.add("leisti patikrinti vaiko sveikat??, bei asmens higien?? Dar??elio sveikatos prie??i??ros specialistams ir pedagogams, siekiant u??kirsti keli?? pedikuliozei ir kit?? u??kre??iam??j?? lig?? plitimui;").setPreSymbolText("3.");
	    level4.add("leisti kineziterapeutui atlikti skeleto ir raumen?? b??kl??s tyrim??, siekiant pagerinti biomechanini?? pad????i?? vystym??si;").setPreSymbolText("3.");
	    level4.add("leisti regos korekcijos specialistui, esant poreikiui, ??vertinti regos a??trum??, siekiant gerinti vaik?? reg??jim??;").setPreSymbolText("3.");
	    level4.add("gav?? prane??im?? apie skirt?? viet?? ??staigoje, per 10 kalendorini?? dien?? turi kreiptis ?? ??staig??, patvirtinti vaiko atvykim?? ir pateikti visus reikalingus dokumentus (vaiko gimimo liudijimo kopij??, elektronin?? sveikatos pa??ym??jim?? ir v??liau kiekvienais metais (forma Nr. E027-1) bei pa??ym??, patvirtinan??i??, kad deklaracijoje gyvenamoji vieta nurodyta Klaip??dos rajono savivaldyb??;").setPreSymbolText("3.");
	    level4.add("pasiimti Ugdytin?? i?? Dar??elio per 2 valandas po to, kai T??vams buvo prane??ta apie ??tariam?? Ugdytinio lig?? ar susi??eidim??;").setPreSymbolText("3.");
	    level4.add("pirm?? Ugdytinio neatvykimo dien?? informuoti telefonu ar atvykus apie Ugdytinio lig?? (pedikulioz??) ar kit?? Dar??elio nelankymo prie??ast?? iki 8.15 val. ryto grup??s arba bendruoju telefonu;").setPreSymbolText("3.");
	    level4.add("ligos atveju nevesti Ugdytinio ?? Dar??el??;").setPreSymbolText("3.");
	    level4.add("informuoti apie bet kokius specialius Ugdytinio poreikius (ugdymosi, maisto, alergijos ir pan.);").setPreSymbolText("3.");
	    level4.add("atlyginti Ugdytino padaryt?? materialin?? ??al?? Dar??eliui ar kitiems asmenims, kuri?? vaikas padaro b??damas Dar??elyje;").setPreSymbolText("3.");
	    level4.add("atvesti Ugdytin?? ?? Dar??el?? ??var??, aprengt?? tvarkingais, ??variais drabu??iais, esant tinkamoms oro s??lygoms, neprie??tarauti jo i??vedimui ?? lauk??, pasir??pinti atsarginiais drabu??iais vaikui perrengti;").setPreSymbolText("3.");
	    level4.add("laiku, nustatyta tvarka ir terminais sumok??ti Savivaldyb??s nustatyto dyd??io mokest?? u?? teikiamas paslaugas;").setPreSymbolText("3.");
	    level4.add("laiku, numatyta tvarka ir terminais, sumok??ti u?? T??v?? pageidavimu Ugdytiniui teikiamas papildomas paslaugas Dar??elyje;").setPreSymbolText("3.");
	    level4.add("Ugdytin?? privalo atlyd??ti ?? Dar??el?? ir pasiimti i?? Dar??elio suaug?? asmenys.").setPreSymbolText("3.");
	    level4.add("neleisti Ugdytiniui ne??tis ?? Dar??el?? verting?? ir pavojing?? daikt?? ( mobili??j?? telefon??, fotoaparat??, elektronini?? ??aidim??, pinig??, a??tri?? daikt??, vaist?? ir pan.) bei maisto produkt??, galin??i?? sukelti pavoj?? vaik?? sveikatai ir saugumui (saldumyn?? su kremu ar ??okoladu, g??rim?? su da??ikliais, konservantais, saldikliais, bulvi?? tra??ku??i?? ir pan.);").setPreSymbolText("3.");
	    level4.add("sutikti, kad Ugdytinio asmens ir kiti teis??s aktuose nustatyti duomenys bus tvarkomi teis??s aktuose nustatytuose registruose;").setPreSymbolText("3.");
	    level4.add("apr??pinti Ugdytin?? individualiomis higienos ir ugdymosi priemon??mis.").setPreSymbolText("3.");
	    
	    item3.add(level4);
	    topLevel.add(item3);
	    
	    ListItem item4 = new ListItem();
	    item4.add(new Paragraph().add("T??vai turi teis??:").setBold());
	    
	    List level5 = new List(ListNumberingType.DECIMAL);
	    level5.add("??inoti vaiko ugdymosi rezultatus, i??kylan??ias socializacijos, psichologines ar pedagogines problemas;").setPreSymbolText("4.");
	    level5.add("parinkti papildomo ugdymo veikl?? (ekskursijas, i??vykas ir kitus papildomus edukacinius renginius) pagal vaiko poreikius ir Dar??elio galimybes.").setPreSymbolText("4.");
	    level5.add("teikti si??lymus d??l ugdymo darbo organizavimo, ugdymo kokyb??s gerinimo, dalyvauti T??vams skirtuose renginiuose, susirinkimuose, savivaldoje.").setPreSymbolText("4.");
	    
	    item4.add(level5);
	    topLevel.add(item4);
	    
	    document.add(topLevel);
	    
	    document.add(new Paragraph("III. SUTARTIES ??SIGALIOJIMAS, GALIOJIMAS, KEITIMAS IR NUTRAUKIMAS").setTextAlignment(TextAlignment.CENTER).setBold());
	    
	    List topLevel2 = new List(ListNumberingType.DECIMAL).setItemStartIndex(5);
	    
	    ListItem item5 = new ListItem();
	    item5.add(new Paragraph().add("Sutartis ??sigalioja nuo jos pasira??ymo dienos ir galioja iki Ugdytinis baigs ").add("ikimokyklinio ugdymo program??."));
	    
	    topLevel2.add(item5);
	    
	    ListItem item6 = new ListItem();
	    item6.add(new Paragraph().add("Sutartis gali b??ti nutraukta:"));
	    
	    List level6 = new List(ListNumberingType.DECIMAL);
	    level6.add("??ali?? susitarimu;").setPreSymbolText("6.");
	    level6.add("T??vams viena??ali??kai parei??kus apie Sutarties nutraukim?? prie?? 10 darbo dien??;");
	    
	    item6.add(level6);
	    topLevel2.add(item6);
	    
	    ListItem item7 = new ListItem();
	    item7.add(new Paragraph().add("Dar??elis viena??ali??kai gali nutraukti Sutart??:"));
	    
	    List level7 = new List(ListNumberingType.DECIMAL);
	    level7.add("kai Ugdytinio elgesys kelia reali?? ir akivaizd??i?? gr??sm?? Dar??elio vaik?? arba Dar??elio darbuotoj?? saugumui").setPreSymbolText("7.");
	    level7.add("T??vai nuolat pa??eidin??ja Sutarties 3.14 punkto reikalavim?? laiku atvesti ir pasiimti ugdytin??;");
	    level7.add("T??vai v??luoja atsiskaityti u?? teikiamas paslaugas 2 m??nesius. Sutarties nutraukimas neatleid??ia nuo prievol??s sumok??ti u?? suteiktas paslaugas.");
	    
	    item7.add(level7);
	    topLevel2.add(item7);
	    
	    ListItem item8 = new ListItem();
	    item8.add(new Paragraph().add("Visi Sutarties pakeitimai, priedai ir papildymai sudaromi tik ra??tu, Sutartis turi b??ti registruota teis??s akt?? nustatyta tvarka."));
	    
	    topLevel2.add(item8);
	    
	    document.add(topLevel2);
	        
	    document.add(new Paragraph("IV. GIN???? SPRENDIMAS").setTextAlignment(TextAlignment.CENTER).setBold());

	    List topLevel3= new List(ListNumberingType.DECIMAL).setItemStartIndex(9);
	    
	    ListItem item9 = new ListItem();
	    item9.add(new Paragraph().add("Gin??ytini ugdymo proceso organizavimo, Dar??elio veiklos, sutarties pa??eidimo klausimai sprend??iami ??alims geranori??kai bendradarbiaujant. Gin??ytini klausimai pirmiausiai aptariami su grup??s mokytoju, direktoriaus pavaduotoju ugdymui, kitais specialistais. Neradus sprendimo, kreipiamasi ?? Dar??elio direktori??."));
	    
	    topLevel3.add(item9);
	    
	    ListItem item10 = new ListItem();
	    item10.add(new Paragraph().add("T??v?? pra??ymus d??l gin???? objektyvumo nagrin??ja direktoriaus ??sakymu sudaryta komisija, kuri?? sudaro administracijos, pedagog?? ir ugdytinio atstovai."));
	    
	    topLevel3.add(item10);
	    
	    document.add(topLevel3);
	    
	    //------ Rules List end ---------------------------------------------------------------------------------------------------
	    document.add(new Paragraph(""));
	    document.add(new Paragraph("Sutarties ??ali?? para??ai:").setTextAlignment(TextAlignment.LEFT).setBold());
	    
	    document.add(new Paragraph("Ugdymo ??staigos atstovas:"));
	    
	    Table table = new Table(UnitValue.createPercentArray(new float[]{4,4,4,4}));
	    table.setWidth(UnitValue.createPercentValue(100));
	    table.addCell(new Cell().setBorder(Border.NO_BORDER)); 
	    table.addCell(new Cell(1, 2).add(new Paragraph("(Para??as)").setBorder(Border.NO_BORDER))
	    		.setTextAlignment(TextAlignment.CENTER)
	    		.setVerticalAlignment(VerticalAlignment.MIDDLE)
	    		.setFontSize(8)
	    		.setBorder(Border.NO_BORDER)
	    		);
	            
	    table.addCell(new Cell() //.add("Vardas pavard??")
	    		.setMarginBottom(-4)
	    		.setTextAlignment(TextAlignment.CENTER)
	    		.setVerticalAlignment(VerticalAlignment.BOTTOM)
	    		.setFontSize(10)
	    		.setBorder(Border.NO_BORDER)
	    		.setBorderBottom(new SolidBorder(0.5f))
	    		); 
	    table.addCell(new Cell().setBorder(Border.NO_BORDER));
	    table.addCell(new Cell().setBorder(Border.NO_BORDER));
	    table.addCell(new Cell().setBorder(Border.NO_BORDER));
	    table.addCell(new Cell().add(new Paragraph(new Text("(vardas, pavard??)")
	    		.setTextRise(3).setFontSize(8)))
	    		.setTextAlignment(TextAlignment.CENTER)
	    		.setVerticalAlignment(VerticalAlignment.TOP)
	    		.setFontSize(8)
	    		.setBorder(Border.NO_BORDER)
	    		);
	    document.add(table);  
	    
	    document.add(new Paragraph(""));
	    document.add(new Paragraph(""));
	    document.add(new Paragraph(""));
	    document.add(new Paragraph("T??vas/Glob??jas"));
	    
	    Table table2 = new Table(UnitValue.createPercentArray(new float[]{4,4,4,4}));
	    table2.setWidth(UnitValue.createPercentValue(100));
	    table2.addCell(new Cell().setBorder(Border.NO_BORDER)); 
	    table2.addCell(new Cell(1, 2).add(new Paragraph("(Para??as)")) //.add("(Para??as)"
	    		.setTextAlignment(TextAlignment.CENTER)
	    		.setVerticalAlignment(VerticalAlignment.MIDDLE)
	    		.setFontSize(8)
	    		.setBorder(Border.NO_BORDER)
	    		);
	            
	    table2.addCell(new Cell()  // .add("Vardas pavard??")
	    		.setMarginBottom(-4)
	    		.setTextAlignment(TextAlignment.CENTER)
	    		.setVerticalAlignment(VerticalAlignment.BOTTOM)
	    		.setFontSize(10)
	    		.setBorder(Border.NO_BORDER)
	    		.setBorderBottom(new SolidBorder(0.5f))
	    		); 
	    table2.addCell(new Cell().setBorder(Border.NO_BORDER));
	    table2.addCell(new Cell().setBorder(Border.NO_BORDER));
	    table2.addCell(new Cell().setBorder(Border.NO_BORDER));
	    table2.addCell(new Cell().add(new Paragraph(new Text("(vardas, pavard??)")
	    		.setTextRise(3).setFontSize(8)))
	    		.setTextAlignment(TextAlignment.CENTER)
	    		.setVerticalAlignment(VerticalAlignment.TOP)
	    		.setFontSize(8)
	    		.setBorder(Border.NO_BORDER)
	    		); 
	    document.add(table2);  
	    
	    document.close();
	    
	    System.out.println(filename + " - Awesome PDF just got created.");
	    
	    return byteArrayOutputStream.toByteArray();
	}

}
