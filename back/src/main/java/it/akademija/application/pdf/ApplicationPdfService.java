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
import com.itextpdf.kernel.pdf.canvas.draw.ILineDrawer;
import com.itextpdf.kernel.pdf.canvas.draw.SolidLine;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.border.Border;
import com.itextpdf.layout.border.SolidBorder;
import com.itextpdf.layout.element.Cell;
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
        case 4:  monthString = "Balandžio";
                 break;
        case 5:  monthString = "Gegužės";
                 break;
        case 6:  monthString = "Birželio";
                 break;
        case 7:  monthString = "Liepos";
                 break;
        case 8:  monthString = "Rugpjūčio";
                 break;
        case 9:  monthString = "Rugsėjo";
                 break;
        case 10: monthString = "Spalio";
                 break;
        case 11: monthString = "Lapkričio";
                 break;
        case 12: monthString = "Gruodžio";
                 break;
        default: monthString = "Neteisingas mėnesis";
                 break;
        }	
	    String day = Integer.toString(date.getDayOfMonth());
	    
	    String nr = Long.toString(application.getId()); // Integer.toString(25698);
	    
	    Text dateString = new Text(year + " m. " + monthString + " " + day + " d. Nr. " + nr).setUnderline();

	    //Creating unicode with lithuanian letters
	    Resource fontResource = new ClassPathResource("fonts/arial.ttf");

		 
	    PdfFont lithuanian = PdfFontFactory.createFont(fontResource.getFile().getPath(), PdfEncodings.IDENTITY_H, true);
	    document.setFont(lithuanian);
	    
	    document.add(new Paragraph("IKIMOKYKLINIO UGDYMO PASLAUGŲ SUTARTIS").setTextAlignment(TextAlignment.CENTER).setBold());

	    document.add(new Paragraph(dateString).setTextAlignment(TextAlignment.CENTER));
	    
	    //------------------ 
	    
	    String virsus1 = "Ikimokyklinio ugdymo paslaugų sutartis sudaroma tarp   ";
	    String virsus2 = application.getApprovedKindergarten().getName(); //" (Darželio pavadinimas) ";
	    String virsus3 = " atstovaujamo ";
	    String virsus4 = application.getApprovedKindergarten().getDirectorName() + " " + //" (Darželio direktorius) ";
	    		         application.getApprovedKindergarten().getDirectorSurname();     //" (Darželio direktorius) ";
	    String virsus5 = "veikiančios pagal Darželio nuostatus ir Tėvų/Globėjų (toliau - Tėvai), atstovaujančių vaiko interesus.";
	    
	    Paragraph virsus = new Paragraph();
	    
	    virsus.add(virsus1).setFirstLineIndent(25);
	    virsus.add("_____"+virsus2+"_____");
	    virsus.add(virsus3);
	    virsus.add("______"+virsus4+"______");
	    virsus.add(virsus5);
	    document.add(virsus);
	    
	    //------------------
	    
	    String tevu_vardas_pavarde = "________________________________"+ application.getMainGuardian().getParentDetails().getName() + " " 
	    															   + application.getMainGuardian().getParentDetails().getSurname(); // "TVardas TPavarde"; 
	    String faktines_gyvenamosios_vietos_adresas = "___________________________________" + application.getMainGuardian().getParentDetails().getAddress(); //"Vieta";
	    String telefono_Nr = "___________________________________" + application.getMainGuardian().getParentDetails().getPhone(); // "Tel Nr.";
	    String el_pastas = "___________________________________" + application.getMainGuardian().getParentDetails().getEmail(); // "el pastas";
	    
	    Paragraph para_tevu_vardas_pavarde = new Paragraph(tevu_vardas_pavarde).add(new Tab());
	    Paragraph fakt = new Paragraph(faktines_gyvenamosios_vietos_adresas).add(new Tab());
	    Paragraph tel = new Paragraph(telefono_Nr).add(new Tab());
	    Paragraph email = new Paragraph(el_pastas).add(new Tab());

	    ILineDrawer filling = new SolidLine(1f);
	    
	    PageSize pageSize1 = document.getPdfDocument().getDefaultPageSize();
	    Rectangle effectivePageSize1 = document.getPageEffectiveArea(pageSize1);
	    float rightTabStopPoint1 = effectivePageSize1.getWidth();
	    TabStop tabStop1 = new TabStop(rightTabStopPoint1, TabAlignment.CENTER, filling);
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
	    Table table_tevu_vardas_pavarde = new Table(1) ;
	    table_tevu_vardas_pavarde.addCell(new Cell().add(new Paragraph(new Text("(Tėvų vardas, pavardė)").setTextRise(9).setFontSize(9)).setMarginLeft(210))
	    		                 .setBorder(Border.NO_BORDER));
	    document.add(table_tevu_vardas_pavarde);
	    
	    document.add(fakt); 

	    document.add(tel);

	    document.add(email);
	    
	    Table triple_label = new Table(1) ;
	    triple_label.addCell(new Cell().add(new Paragraph(new Text("(faktinės gyvenamosios vietos adresas, telefono Nr., el. paštas)").setTextRise(6).setFontSize(9)).setMarginLeft(120))
	    		                 .setBorder(Border.NO_BORDER));
	    document.add(triple_label);
	    
	    document.add(new Paragraph("(Sutartį pasirašius vienam iš Tėvų, kitas iš Tėvų neatleidžiamas nuo šios sutarties įsipareigojimų vykdymo)."));
	    
	    document.add(new Paragraph("I. SUTARTIES OBJEKTAS").setTextAlignment(TextAlignment.CENTER).setBold());
	    
	    String sutart1 = "Ikimokyklinio ugdymo paslaugų sutartimi (toliau – Sutartis) Darželis įsipareigoja teikti ugdymo paslaugas ";
	    String sutart2 = application.getChildName() + " " + application.getChildSurname();   // "Vardas Pavardė";
	    String sutart3 = " toliau – Ugdytinis,";
	    String sutart4 = "(vaiko vardas, pavardė)";
	    String sutart5 = "\no Tėvai įsipareigoja apmokėti už šias paslaugas bei vykdyti visus įsipareigojimus, prisiimtus Sutartimi.";
	    String sutart6 = "Ugdymo paslaugos apima sisteminį neformalaus ugdymų plano(-ų), ugdymo programos(-ų) sudarymą ir įgyvendinimą atitinkamoms amžiaus grupėms pagal LR Švietimo ir mokslo ministerijos bei Klaipėdos rajono savivaldybės (toliau – Savivaldybė) patvirtintas programas, rekomendacijas, tvarkos aprašus ir kitus norminius teisės aktus.";
	    	    
	    Paragraph para = new Paragraph();
	    
	    para.add(sutart1).setFirstLineIndent(25);
	    para.add("___________"+sutart2+"___________");
	    para.add(sutart3);
	    document.add(para);
	    
	    Table table4 = new Table(1) ;
	    table4.addCell(new Cell().add(new Paragraph(new Text(sutart4).setTextRise(9).setFontSize(9)).setMarginLeft(180))
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
	    
	    document.add(new Paragraph("II. SUTARTIES ŠALIŲ ĮSIPAREIGOJIMAI").setTextAlignment(TextAlignment.CENTER).setBold());
	    
	    List topLevel = new List(ListNumberingType.DECIMAL);
	    
	    ListItem item1 = new ListItem();
	    item1.add(new Paragraph().add("Darželis įsipareigoja:").setBold());
	    
	    String textitalic = "* Už papildomos, Švietimo įstatymu nereglamentuotos, bet Tėvų pageidavimu vykdomos mokamos veiklos (būrelių, užsiėmimų, studijų ir kt.) kokybę Darželis neatsako.";
	    
	    List level2 = new List(ListNumberingType.DECIMAL);
	    level2.add("įgyvendinti ikimokyklinio ugdymo programą.").setPreSymbolText("1.");
	    level2.add("užtikrinti, kad suteiktos paslaugos atitiktų galiojančius teisės aktus;").setPreSymbolText("1.");
	    level2.add("užtikrinti, kad paslaugos atitiktų ugdytinio poreikius, individualizuoti ir diferencijuoti\n" + 
	    		"ugdymo turinį, skiriant visoms vaiko raidos sritims – sveikatos, socialinei, kalbos, pažinimo, meninei – vienodą dėmesį, pritaikyti jį specialiųjų poreikių vaikams;").setPreSymbolText("1.");
	    level2.add("teikti pedagoginę, specialiąją pedagoginę pagalbą, kineziterapeuto, masažuotojo, regos korekcijos specialisto paslaugas, bendrauti ir bendradarbiauti su specialiųjų poreikių vaikų individualios korekcinės pagalbos institucijomis;").setPreSymbolText("1.");
	    level2.add("organizuoti medicininę pagalbą Ugdytiniui nelaimės atveju. Ugdytiniui susirgus ar susižeidus informuoti Tėvus;").setPreSymbolText("1.");
	    level2.add("* organizuoti papildomo ugdymo veiklą atsižvelgiant į vaiko poreikius ir įstaigos galimybes;\n"  ).setPreSymbolText("1.");
	    document.add(new Paragraph(textitalic).setFontSize(8).setItalic());
	    level2.add("ugdymosi pasiekimus vertinti objektyviai ir nešališkai, vadovaujantis individualios pažangos principu;").setPreSymbolText("1.");
	    level2.add("teikti informaciją apie Ugdytinio pasiekimus, elgesį Tėvams ir saugoti šios informacijos konfidencialumą.").setPreSymbolText("1.");
	    level2.add("bendradarbiauti su Tėvais sprendžiant ugdymo proceso organizavimo, vaikų ugdymo(si) klausimus, inicijuoti Tėvų dalyvavimą Darželio savivaldoje;").setPreSymbolText("1.");
	    level2.add("tvarkyti Ugdytinio asmens duomenis vadovaujantis Asmens duomenų teisinės apsaugos įstatymu.").setPreSymbolText("1.");
	    
	    item1.add(level2);
	    topLevel.add(item1);
	    
	    ListItem item2 = new ListItem();
	    item2.add(new Paragraph().add("Darželis turi teisę:").setBold());

	    List level3 = new List(ListNumberingType.DECIMAL);
	    level3.add("savo nuožiūra kurti ir taikyti pedagoginės veiklos programas, metodus ir formas;").setPreSymbolText("2.");
	    level3.add("Sutartyje nustatytomis sąlygomis ir tvarka atsisakyti teikti ikimokyklinio ugdymo paslaugas ir nutraukti šią sutartį savo iniciatyva;").setPreSymbolText("2.");
	    level3.add("konsultuotis ir informuoti apie rimtą Sutarties pažeidimą, atitinkamas institucijas (Vaiko teisių apsaugos skyrių, Klaipėdos rajono pedagoginę psichologinę tarnybą ir pan.)").setPreSymbolText("2.");
	    level3.add("reikalauti, kad Tėvai imtųsi konkrečių priemonių dėl netinkamo Ugdytinio elgesio;").setPreSymbolText("2.");
	    level3.add("fotografuoti, filmuoti Ugdytinį darželio švenčių, ekskursijų ir kitų ugdymo tikslais organizuojamų renginių metu.").setPreSymbolText("2.");
	    
	    item2.add(level3);
	    topLevel.add(item2);
	    
	    ListItem item3 = new ListItem();
	    item3.add(new Paragraph().add("Tėvai įsipareigoja:").setBold());
	    
	    List level4 = new List(ListNumberingType.DECIMAL);
	    level4.add("ugdyti vaiko pagarbą mokytojams, bendraamžiams bei Darželio bendruomenės nariams;").setPreSymbolText("3.");
	    level4.add("leisti patikrinti vaiko sveikatą, bei asmens higieną Darželio sveikatos priežiūros specialistams ir pedagogams, siekiant užkirsti kelią pedikuliozei ir kitų užkrečiamųjų ligų plitimui;").setPreSymbolText("3.");
	    level4.add("leisti kineziterapeutui atlikti skeleto ir raumenų būklės tyrimą, siekiant pagerinti biomechaninių padėčių vystymąsi;").setPreSymbolText("3.");
	    level4.add("leisti regos korekcijos specialistui, esant poreikiui, įvertinti regos aštrumą, siekiant gerinti vaikų regėjimą;").setPreSymbolText("3.");
	    level4.add("gavę pranešimą apie skirtą vietą Įstaigoje, per 10 kalendorinių dienų turi kreiptis į Įstaigą, patvirtinti vaiko atvykimą ir pateikti visus reikalingus dokumentus (vaiko gimimo liudijimo kopiją, elektroninį sveikatos pažymėjimą ir vėliau kiekvienais metais (forma Nr. E027-1) bei pažymą, patvirtinančią, kad deklaracijoje gyvenamoji vieta nurodyta Klaipėdos rajono savivaldybė;").setPreSymbolText("3.");
	    level4.add("pasiimti Ugdytinį iš Darželio per 2 valandas po to, kai Tėvams buvo pranešta apie įtariamą Ugdytinio ligą ar susižeidimą;").setPreSymbolText("3.");
	    level4.add("pirmą Ugdytinio neatvykimo dieną informuoti telefonu ar atvykus apie Ugdytinio ligą (pedikuliozę) ar kitą Darželio nelankymo priežastį iki 8.15 val. ryto grupės arba bendruoju telefonu;").setPreSymbolText("3.");
	    level4.add("ligos atveju nevesti Ugdytinio į Darželį;").setPreSymbolText("3.");
	    level4.add("informuoti apie bet kokius specialius Ugdytinio poreikius (ugdymosi, maisto, alergijos ir pan.);").setPreSymbolText("3.");
	    level4.add("atlyginti Ugdytino padarytą materialinę žalą Darželiui ar kitiems asmenims, kurią vaikas padaro būdamas Darželyje;").setPreSymbolText("3.");
	    level4.add("atvesti Ugdytinį į Darželį švarų, aprengtą tvarkingais, švariais drabužiais, esant tinkamoms oro sąlygoms, neprieštarauti jo išvedimui į lauką, pasirūpinti atsarginiais drabužiais vaikui perrengti;").setPreSymbolText("3.");
	    level4.add("laiku, nustatyta tvarka ir terminais sumokėti Savivaldybės nustatyto dydžio mokestį už teikiamas paslaugas;").setPreSymbolText("3.");
	    level4.add("laiku, numatyta tvarka ir terminais, sumokėti už Tėvų pageidavimu Ugdytiniui teikiamas papildomas paslaugas Darželyje;").setPreSymbolText("3.");
	    level4.add("Ugdytinį privalo atlydėti į Darželį ir pasiimti iš Darželio suaugę asmenys.").setPreSymbolText("3.");
	    level4.add("neleisti Ugdytiniui neštis į Darželį vertingų ir pavojingų daiktų ( mobiliųjų telefonų, fotoaparatų, elektroninių žaidimų, pinigų, aštrių daiktų, vaistų ir pan.) bei maisto produktų, galinčių sukelti pavojų vaikų sveikatai ir saugumui (saldumynų su kremu ar šokoladu, gėrimų su dažikliais, konservantais, saldikliais, bulvių traškučių ir pan.);").setPreSymbolText("3.");
	    level4.add("sutikti, kad Ugdytinio asmens ir kiti teisės aktuose nustatyti duomenys bus tvarkomi teisės aktuose nustatytuose registruose;").setPreSymbolText("3.");
	    level4.add("aprūpinti Ugdytinį individualiomis higienos ir ugdymosi priemonėmis.").setPreSymbolText("3.");
	    
	    item3.add(level4);
	    topLevel.add(item3);
	    
	    ListItem item4 = new ListItem();
	    item4.add(new Paragraph().add("Tėvai turi teisę:").setBold());
	    
	    List level5 = new List(ListNumberingType.DECIMAL);
	    level5.add("žinoti vaiko ugdymosi rezultatus, iškylančias socializacijos, psichologines ar pedagogines problemas;").setPreSymbolText("4.");
	    level5.add("parinkti papildomo ugdymo veiklą (ekskursijas, išvykas ir kitus papildomus edukacinius renginius) pagal vaiko poreikius ir Darželio galimybes.").setPreSymbolText("4.");
	    level5.add("teikti siūlymus dėl ugdymo darbo organizavimo, ugdymo kokybės gerinimo, dalyvauti Tėvams skirtuose renginiuose, susirinkimuose, savivaldoje.").setPreSymbolText("4.");
	    
	    item4.add(level5);
	    topLevel.add(item4);
	    
	    document.add(topLevel);
	    
	    document.add(new Paragraph("III. SUTARTIES ĮSIGALIOJIMAS, GALIOJIMAS, KEITIMAS IR NUTRAUKIMAS").setTextAlignment(TextAlignment.CENTER).setBold());
	    
	    List topLevel2 = new List(ListNumberingType.DECIMAL).setItemStartIndex(5);
	    
	    ListItem item5 = new ListItem();
	    item5.add(new Paragraph().add("Sutartis įsigalioja nuo jos pasirašymo dienos ir galioja iki Ugdytinis baigs ").add("ikimokyklinio ugdymo programą."));
	    
	    topLevel2.add(item5);
	    
	    ListItem item6 = new ListItem();
	    item6.add(new Paragraph().add("Sutartis gali būti nutraukta:"));
	    
	    List level6 = new List(ListNumberingType.DECIMAL);
	    level6.add("šalių susitarimu;").setPreSymbolText("6.");
	    level6.add("Tėvams vienašališkai pareiškus apie Sutarties nutraukimą prieš 10 darbo dienų;");
	    
	    item6.add(level6);
	    topLevel2.add(item6);
	    
	    ListItem item7 = new ListItem();
	    item7.add(new Paragraph().add("Darželis vienašališkai gali nutraukti Sutartį:"));
	    
	    List level7 = new List(ListNumberingType.DECIMAL);
	    level7.add("kai Ugdytinio elgesys kelia realią ir akivaizdžią grėsmę Darželio vaikų arba Darželio darbuotojų saugumui").setPreSymbolText("7.");
	    level7.add("Tėvai nuolat pažeidinėja Sutarties 3.14 punkto reikalavimą laiku atvesti ir pasiimti ugdytinį;");
	    level7.add("Tėvai vėluoja atsiskaityti už teikiamas paslaugas 2 mėnesius. Sutarties nutraukimas neatleidžia nuo prievolės sumokėti už suteiktas paslaugas.");
	    
	    item7.add(level7);
	    topLevel2.add(item7);
	    
	    ListItem item8 = new ListItem();
	    item8.add(new Paragraph().add("Visi Sutarties pakeitimai, priedai ir papildymai sudaromi tik raštu, Sutartis turi būti registruota teisės aktų nustatyta tvarka."));
	    
	    topLevel2.add(item8);
	    
	    document.add(topLevel2);
	        
	    document.add(new Paragraph("IV. GINČŲ SPRENDIMAS").setTextAlignment(TextAlignment.CENTER).setBold());

	    List topLevel3= new List(ListNumberingType.DECIMAL).setItemStartIndex(9);
	    
	    ListItem item9 = new ListItem();
	    item9.add(new Paragraph().add("Ginčytini ugdymo proceso organizavimo, Darželio veiklos, sutarties pažeidimo klausimai sprendžiami šalims geranoriškai bendradarbiaujant. Ginčytini klausimai pirmiausiai aptariami su grupės mokytoju, direktoriaus pavaduotoju ugdymui, kitais specialistais. Neradus sprendimo, kreipiamasi į Darželio direktorių."));
	    
	    topLevel3.add(item9);
	    
	    ListItem item10 = new ListItem();
	    item10.add(new Paragraph().add("Tėvų prašymus dėl ginčų objektyvumo nagrinėja direktoriaus įsakymu sudaryta komisija, kurią sudaro administracijos, pedagogų ir ugdytinio atstovai."));
	    
	    topLevel3.add(item10);
	    
	    document.add(topLevel3);
	    
	    //------ Rules List end ---------------------------------------------------------------------------------------------------
	    document.add(new Paragraph(""));
	    document.add(new Paragraph("Sutarties šalių parašai:").setTextAlignment(TextAlignment.LEFT).setBold());
	    
	    document.add(new Paragraph("Ugdymo įstaigos atstovas:"));
	    
	    Table table = new Table(4) ;
	    table.addCell(new Cell().setBorder(Border.NO_BORDER)); 
	    table.addCell(new Cell(1, 2).add("(Parašas)")
	    		.setTextAlignment(TextAlignment.CENTER)
	    		.setVerticalAlignment(VerticalAlignment.MIDDLE)
	    		.setFontSize(8)
	    		.setBorder(Border.NO_BORDER)
	    		);
	            
	    table.addCell(new Cell() //.add("Vardas pavardė")
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
	    table.addCell(new Cell().add(new Paragraph(new Text("(vardas, pavardė)")
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
	    document.add(new Paragraph("Tėvas/Globėjas"));
	    
	    Table table2 = new Table(4) ;
	    table2.addCell(new Cell().setBorder(Border.NO_BORDER)); 
	    table2.addCell(new Cell(1, 2).add("(Parašas)")
	    		.setTextAlignment(TextAlignment.CENTER)
	    		.setVerticalAlignment(VerticalAlignment.MIDDLE)
	    		.setFontSize(8)
	    		.setBorder(Border.NO_BORDER)
	    		);
	            
	    table2.addCell(new Cell()  // .add("Vardas pavardė")
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
	    table2.addCell(new Cell().add(new Paragraph(new Text("(vardas, pavardė)")
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
