import React from "react";
import { Typography } from "@material-ui/core";

export default () => (
    <div>
        <Typography variant="h4">Group Requirements</Typography>
        <p>
            <b>
                Every group on TandaPay is defined by a set of documents and
                parameters. These include the following:
            </b>
            <ul>
                <li>A name that succintly describes the group</li>
                <li>
                    A monthy premium cost of coverage, denoted in{" "}
                    <a href="https://makerdao.com/en/dai">DAI</a>.
                </li>
                <li>A charter document</li>
            </ul>
        </p>
        <Typography variant="h4">Charter Requirements</Typography>
        <p>
            <b>Charters are composed of five main sections:</b>
            <ol>
                <li> What determines the cost of a premium</li>
                <li>Type of coverage (which events trigger a claim)</li>
                <li>What are the requirements to submit a valid claim</li>
                <li>What qualifies people to participate</li>
                <li>What guidelines do communities use to resolve disputes</li>
            </ol>
        </p>
        <p>
            <b>What detemines the cost of a premium:</b>
            <ol>
                <li>Funds deficit calculation tab</li>
                <li>Funds deficit documentation</li>
                <li>Items determined by secretaries input</li>
                <ul>
                    <li>Maximum # of claims a group wants to pay per period</li>
                    <li>Value of each claim</li>
                    <li>Terms of loan repayment</li>
                </ul>
                <li>Generic explanation provided</li>
                <ul>
                    <li>An explanation of rebates</li>
                    <li>An explanation of overpayments</li>
                </ul>
                <li>Expectation of approximate size of monthly payment</li>
                <li>Month 1, 2, 3, 4, 5 …</li>
            </ol>
        </p>
        <p>
            <b>Which events trigger a claim:</b>
            <ul>
                <li>
                    Specific description of the types of triggering events
                    associated with a valid claim
                </li>
                <li>What are claim payments expected to pay for?</li>
                <li>
                    Provide some examples of a valid use of a claim payment{" "}
                </li>
                <ul>
                    <li>Hospital bills</li>
                    <li>Compensation for damaged or stolen property</li>
                    <li>Compensation for legal fees</li>
                    <li>Compensation for lost wages</li>
                </ul>
            </ul>
        </p>
        <p>
            <b>What are the requirements to submit a valid claim:</b>
            <ul>
                <li>
                    List of items required to make an{" "}
                    <b>initial claim request</b> to open a claim pre
                    whitelisting
                </li>
                <li>
                    List of items required to <b>whitelist a claim</b>
                </li>
                <li>Conditions which make a claim invalid</li>
                <li>
                    Likely edge cases and specific steps to resolve each case as
                    either valid or invalid
                </li>
                <li>
                    Window of time someone can open a claim for payment in the
                    current period
                    <p>
                        <b>Submission for payment in current period window</b>
                        <ul>
                            <li>Day 1 - day 24 open</li>
                            <li>
                                Day 25 - day 31 claims may be required to be
                                moved to next period due to the time required to
                                gather documentation to whitelist a claim
                            </li>
                        </ul>
                    </p>
                </li>

                <li>
                    How quickly are policyholders required to submit an initial
                    claim request after the occurrence of a triggering event
                    before the claim becomes invalid?
                    <br />
                    <b>Initial claim request window:</b> 3 days or 72 hours
                </li>
                <li>
                    Are claims ever permitted to be opened after this window
                    ends? If so, under what circumstances?
                </li>
                <li>
                    How quickly are policyholders required to submit evidence
                    required to whitelist a claim after the occurence of the
                    initial claim request before the claim becomes invalid?
                    <br />
                    <b>Whitelist opened claim window</b>: 7 days
                </li>
                <li>
                    Are claims ever permitted to be whitelisted after this
                    window ends? If so, under what circumstances?
                </li>
            </ul>
        </p>
        <p>
            <b>Partitipation in TandaPay group:</b>
            <ul>
                <li>What qualifies a policyholder to participate?</li>
                <li>
                    Is it a requirement to come to meetings once a month to
                    continue in the group?
                </li>
                <li>
                    What actions result in a policyholders removal from the
                    TandaPay group?
                </li>
                <li>Do failure to show up to meetings result in removal?</li>
                <li>
                    How many times can a policyholder fail to pay their premium
                    before they are removed?
                </li>
                <li>Does defection result in instant removal?</li>
                <li>
                    If a subgroup requests removal of a member can they be
                    placed into a new subgroup?
                </li>
                <li>
                    What is the specific policy about changing one’s subgroup
                </li>
            </ul>
        </p>
        <p>
            <b>How are disputes resolved?</b>
            <ul>
                <li>
                    What recourse do policyholders have other than defection to
                    resolve disputes fairly?
                </li>
                <li>What is the standard for fairness within the community?</li>
                <li>
                    How should policyholders expect to be treated if their claim
                    is in dispute?
                </li>
                <li>
                    Generic explanation of defection as a final way to resolve a
                    dispute by leaving a group
                </li>
            </ul>
        </p>
    </div>
);
