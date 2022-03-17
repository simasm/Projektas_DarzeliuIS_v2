package it.akademija.application.pdf;

import java.io.IOException;

import javax.swing.GroupLayout.Alignment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import com.itextpdf.io.font.PdfEncodings;
import com.itextpdf.io.source.ByteArrayOutputStream;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.borders.SolidBorder;
//import com.itextpdf.layout.border.Border;
//import com.itextpdf.layout.border.SolidBorder;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.HorizontalAlignment;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.layout.property.UnitValue;
import com.itextpdf.layout.property.VerticalAlignment;

import it.akademija.compensation.Compensation;
import it.akademija.compensation.CompensationService;

@Service
public class CompensationPdfService {
	
	@Autowired
	private CompensationService compensationService;

	public byte[] createCompensationPdf(String id) throws IOException{
		
		Compensation compensation = compensationService.getUserCompensationById(id);
		
		String filename = compensation.getChildName() + " " + compensation.getChildSurname() +
		                  " " + id + " - " + " Prašymas dėl kompensacijos";
		
		//Initialize document conversion into byte array output stream
		ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
		
		//Initialize PDF writer
		PdfWriter writer = new PdfWriter(byteArrayOutputStream);
				
		//Initialize PDF document
		PdfDocument pdf = new PdfDocument(writer);
				
		//Initialize document
		Document document = new Document(pdf);
		
		//Creating unicode with lithuanian letters
	    Resource fontResource = new ClassPathResource("fonts/arial.ttf");
 
	    PdfFont lithuanian = PdfFontFactory.createFont(fontResource.getFile().getPath(), PdfEncodings.IDENTITY_H, true);
	    
	    document.setFont(lithuanian);
		
		document.add(new Paragraph("Kompensacijos prašymas - " + compensation.getId()).setFontSize(17).setBold());
		
		document.add(new Paragraph("Vaiko duomenys").setFontSize(11).setBold());
		
		Table childTable = new Table(4).setWidth(UnitValue.createPercentValue(100));
		
		childTable.addCell(new Cell().add(new Paragraph("Vardas")).setFontSize(7).setBold().setCharacterSpacing(0.25f).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(1.0f)));
		childTable.addCell(new Cell().add(new Paragraph("Pavardė")).setFontSize(7).setBold().setCharacterSpacing(0.25f).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(1.0f)));
		childTable.addCell(new Cell().add(new Paragraph("Asmens kodas")).setFontSize(7).setBold().setCharacterSpacing(0.25f).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(1.0f)));
		childTable.addCell(new Cell().add(new Paragraph("Gimimo data")).setFontSize(7).setBold().setCharacterSpacing(0.25f).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(1.0f)));
		childTable.addCell(new Cell().add(new Paragraph(compensation.getChildName())).setFontSize(10).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)));
		childTable.addCell(new Cell().add(new Paragraph(compensation.getChildSurname())).setFontSize(10).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)));
		childTable.addCell(new Cell().add(new Paragraph(compensation.getChildPersonalCode())).setFontSize(10).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)));
		childTable.addCell(new Cell().add(new Paragraph(compensation.getChildBirthdate().toString())).setFontSize(10).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)));
		
		document.add(childTable);
		
		Table mainTable = new Table(UnitValue.createPercentArray(new float[]{45,10,45}));
		mainTable.setWidth(UnitValue.createPercentValue(100));
			
		Table guardianTable = new Table(UnitValue.createPercentArray(new float[]{3,8}));
		
		guardianTable.setWidth(UnitValue.createPercentValue(45));
		
		guardianTable.addCell(new Cell(1, 2).add(new Paragraph("Vaiko atstovo duomenys")).setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE).setFontSize(11).setBold().setCharacterSpacing(0.25f).setBorder(Border.NO_BORDER));
		guardianTable.addCell(new Cell().add(new Paragraph("Vardas")).setTextAlignment(TextAlignment.LEFT).setVerticalAlignment(VerticalAlignment.MIDDLE).setFontSize(7).setBold().setCharacterSpacing(0.25f).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)));
		guardianTable.addCell(new Cell().add(new Paragraph(compensation.getGuardianName())).setFontSize(9).setVerticalAlignment(VerticalAlignment.MIDDLE).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)).setBorderLeft(new SolidBorder(1.2f)));
		guardianTable.addCell(new Cell().add(new Paragraph("Pavardė")).setTextAlignment(TextAlignment.LEFT).setVerticalAlignment(VerticalAlignment.MIDDLE).setFontSize(7).setBold().setCharacterSpacing(0.25f).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)));
		guardianTable.addCell(new Cell().add(new Paragraph(compensation.getGuardianSurname())).setFontSize(9).setVerticalAlignment(VerticalAlignment.MIDDLE).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)).setBorderLeft(new SolidBorder(1.2f)));
		guardianTable.addCell(new Cell().add(new Paragraph("Asmens kodas")).setTextAlignment(TextAlignment.LEFT).setVerticalAlignment(VerticalAlignment.MIDDLE).setFontSize(7).setBold().setCharacterSpacing(0.25f).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)));
		guardianTable.addCell(new Cell().add(new Paragraph(compensation.getGuardianPersonalCode())).setFontSize(9).setVerticalAlignment(VerticalAlignment.MIDDLE).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)).setBorderLeft(new SolidBorder(1.2f)));
		guardianTable.addCell(new Cell().add(new Paragraph("Telefono numeris")).setTextAlignment(TextAlignment.LEFT).setVerticalAlignment(VerticalAlignment.MIDDLE).setFontSize(7).setBold().setCharacterSpacing(0.25f).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)));
		guardianTable.addCell(new Cell().add(new Paragraph(compensation.getGuardianPhone())).setFontSize(9).setVerticalAlignment(VerticalAlignment.MIDDLE).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)).setBorderLeft(new SolidBorder(1.2f)));
		guardianTable.addCell(new Cell().add(new Paragraph("El. paštas")).setTextAlignment(TextAlignment.LEFT).setVerticalAlignment(VerticalAlignment.MIDDLE).setFontSize(7).setBold().setCharacterSpacing(0.25f).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)));
		guardianTable.addCell(new Cell().add(new Paragraph(compensation.getGuardianEmail())).setFontSize(9).setVerticalAlignment(VerticalAlignment.MIDDLE).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)).setBorderLeft(new SolidBorder(1.2f)));
		guardianTable.addCell(new Cell().add(new Paragraph("Adresas")).setTextAlignment(TextAlignment.LEFT).setVerticalAlignment(VerticalAlignment.MIDDLE).setFontSize(7).setBold().setCharacterSpacing(0.25f).setBorder(Border.NO_BORDER));
        guardianTable.addCell(new Cell().add(new Paragraph(compensation.getGuardianAddress())).setFontSize(9).setVerticalAlignment(VerticalAlignment.MIDDLE).setBorder(Border.NO_BORDER).setBorderLeft(new SolidBorder(1.2f)));
        
		//document.add(guardianTable);
		
		Cell firstCell = new Cell();
		firstCell.setBorder(Border.NO_BORDER);
		guardianTable.setWidth(UnitValue.createPercentValue(100));
		firstCell.add(guardianTable);
		
        Table gartenTable = new Table(UnitValue.createPercentArray(new float[]{4,9}));
		
		gartenTable.setWidth(UnitValue.createPercentValue(45));
		
		gartenTable.addCell(new Cell(1, 2).add(new Paragraph("Ugdymo įstaigos duomenys")).setTextAlignment(TextAlignment.CENTER).setVerticalAlignment(VerticalAlignment.MIDDLE).setFontSize(11).setBold().setCharacterSpacing(0.25f).setBorder(Border.NO_BORDER));
		gartenTable.addCell(new Cell().add(new Paragraph("Pavadinimas")).setTextAlignment(TextAlignment.LEFT).setVerticalAlignment(VerticalAlignment.MIDDLE).setFontSize(7).setBold().setCharacterSpacing(0.25f).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)));
		gartenTable.addCell(new Cell().add(new Paragraph(compensation.getKindergartenName())).setFontSize(9).setVerticalAlignment(VerticalAlignment.MIDDLE).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)).setBorderLeft(new SolidBorder(1.2f)));
		gartenTable.addCell(new Cell().add(new Paragraph("Įstaigos kodas")).setTextAlignment(TextAlignment.LEFT).setVerticalAlignment(VerticalAlignment.MIDDLE).setFontSize(7).setBold().setCharacterSpacing(0.25f).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)));
		gartenTable.addCell(new Cell().add(new Paragraph(compensation.getKindergartenId())).setFontSize(9).setVerticalAlignment(VerticalAlignment.MIDDLE).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)).setBorderLeft(new SolidBorder(1.2f)));
		gartenTable.addCell(new Cell().add(new Paragraph("Adresas")).setTextAlignment(TextAlignment.LEFT).setVerticalAlignment(VerticalAlignment.MIDDLE).setFontSize(7).setBold().setCharacterSpacing(0.25f).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)));
		gartenTable.addCell(new Cell().add(new Paragraph(compensation.getKindergartenAddress())).setFontSize(9).setVerticalAlignment(VerticalAlignment.MIDDLE).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)).setBorderLeft(new SolidBorder(1.2f)));
		gartenTable.addCell(new Cell().add(new Paragraph("Telefono numeris")).setTextAlignment(TextAlignment.LEFT).setVerticalAlignment(VerticalAlignment.MIDDLE).setFontSize(7).setBold().setCharacterSpacing(0.25f).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)));
		gartenTable.addCell(new Cell().add(new Paragraph(compensation.getKindergartenPhoneNumber())).setFontSize(9).setVerticalAlignment(VerticalAlignment.MIDDLE).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)).setBorderLeft(new SolidBorder(1.2f)));
		gartenTable.addCell(new Cell().add(new Paragraph("El. paštas")).setTextAlignment(TextAlignment.LEFT).setVerticalAlignment(VerticalAlignment.MIDDLE).setFontSize(7).setBold().setCharacterSpacing(0.25f).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)));
		gartenTable.addCell(new Cell().add(new Paragraph(compensation.getKindergartenEmail())).setFontSize(9).setVerticalAlignment(VerticalAlignment.MIDDLE).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)).setBorderLeft(new SolidBorder(1.2f)));
		gartenTable.addCell(new Cell().add(new Paragraph("Banko pavadinimas")).setTextAlignment(TextAlignment.LEFT).setVerticalAlignment(VerticalAlignment.MIDDLE).setFontSize(7).setBold().setCharacterSpacing(0.25f).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)));
        gartenTable.addCell(new Cell().add(new Paragraph(compensation.getKindergartenBankName())).setFontSize(9).setVerticalAlignment(VerticalAlignment.MIDDLE).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)).setBorderLeft(new SolidBorder(1.2f)));
        gartenTable.addCell(new Cell().add(new Paragraph("Sąskaitos numeris")).setTextAlignment(TextAlignment.LEFT).setVerticalAlignment(VerticalAlignment.MIDDLE).setFontSize(7).setBold().setCharacterSpacing(0.25f).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)));
        gartenTable.addCell(new Cell().add(new Paragraph(compensation.getKindergartenBankAccountNumber())).setFontSize(9).setVerticalAlignment(VerticalAlignment.MIDDLE).setBorder(Border.NO_BORDER).setBorderBottom(new SolidBorder(0.1f)).setBorderLeft(new SolidBorder(1.2f)));
        gartenTable.addCell(new Cell().add(new Paragraph("Banko kodas")).setTextAlignment(TextAlignment.LEFT).setVerticalAlignment(VerticalAlignment.MIDDLE).setFontSize(7).setBold().setCharacterSpacing(0.25f).setBorder(Border.NO_BORDER));
        gartenTable.addCell(new Cell().add(new Paragraph(compensation.getKindergartenBankCode())).setFontSize(9).setVerticalAlignment(VerticalAlignment.MIDDLE).setBorder(Border.NO_BORDER).setBorderLeft(new SolidBorder(1.2f)));
        
		//document.add(gartenTable);
		
		Cell secondCell = new Cell();
		secondCell.setBorder(Border.NO_BORDER);
		gartenTable.setWidth(UnitValue.createPercentValue(100));
		secondCell.add(gartenTable);
		
		document.add(new Paragraph().setMarginBottom(50));

		
		mainTable.addCell(firstCell);
		mainTable.addCell(new Cell().setBorder(Border.NO_BORDER));
		mainTable.addCell(secondCell);
		
		
		document.add(mainTable);
		
		document.close();
		
		System.out.println(filename + " - Awesome PDF just got created.");
		
		return byteArrayOutputStream.toByteArray();
	}
}
