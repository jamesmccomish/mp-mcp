import type { GetDebateData, ToolResponse } from '@jamesmccomish/mp-mcp/types';

// Real capture: parliament_get_debate("42E18377-...", concise) — "NHS Management",
// a six-contribution Commons oral-questions exchange. Concise mode projects each
// contribution down to {attributed_to, text}. Two contributions carry HTML the card
// layer must strip: contribution 0 wraps the question in <Question>/<QuestionText>
// tags, and contribution 2 embeds a <span class="column-number"> mid-sentence.
export const debateFixture = {
  data: {
    ext_id: '42E18377-3932-45F7-8BC6-58B689EBF95F',
    title: 'NHS Management',
    date: '2026-04-14T00:00:00',
    house: 'Commons',
    location: 'Commons Chamber',
    volume: 783,
    previous: {
      ext_id: '73D53D7C-C482-4688-8579-9E0F578D8F40',
      title: 'Maternity Care',
    },
    next: {
      ext_id: '16477EE6-1FE9-4C60-89CF-3EB519885243',
      title: 'Mental Health Services',
    },
    contributions: [
      {
        attributed_to: 'David Davis (Goole and Pocklington) (Con)',
        text: '<Question HRSContentId="{B64D87A1-1942-4568-AFC0-4A93274A187F}">3. <QuestionText HRSContentId="{10920A56-DA49-46BB-A273-D124EAFB6BCE}">What steps he is taking to improve the effectiveness of NHS management. </QuestionText></Question>',
      },
      {
        attributed_to: 'The Minister for Secondary Care (Karin Smyth)',
        text: 'Good managers are the backbone of a well-run health service, freeing up clinicians to focus on patients. We are investing in management training and stripping out the duplication that has built up over years.',
      },
      {
        attributed_to: 'David Davis',
        text: 'The Minister will be aware that in the last <span id="677" class="column-number" data-column-number="677"></span>month two national health service trusts were placed in special measures for management failings. What is she doing to hold failing managers to account?',
      },
      {
        attributed_to: 'Karin Smyth',
        text: 'We are introducing a disbarring system so that managers found guilty of serious misconduct can no longer move quietly to another part of the NHS. Accountability has to mean something.',
      },
      {
        attributed_to: 'Dr Beccy Cooper (Worthing West) (Lab)',
        text: 'Integrated care boards have a vital role in joining up services. Will the Minister set out how the management reforms will strengthen, rather than fragment, that work?',
      },
      {
        attributed_to: 'Karin Smyth',
        text: 'The 10-year plan will give ICBs a clearer remit and the management capacity to deliver it, so that the shift from hospital to community care is properly led.',
      },
    ],
    truncated: false,
    total_items: 6,
  },
  sources: [
    {
      title: 'Hansard: NHS Management',
      url: 'https://hansard.parliament.uk/Commons/2026-04-14/debates/42E18377-3932-45F7-8BC6-58B689EBF95F/nhs-management',
    },
  ],
} satisfies ToolResponse<GetDebateData>;
